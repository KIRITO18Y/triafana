# Despliegue en Dokploy

Esta app (Payload CMS 3 + Next.js, con SQLite) se despliega en Dokploy como una
**Application** basada en el `Dockerfile` del repo (no como Docker Compose —
el `docker-compose.yml` de la raíz es solo para desarrollo local con Mongo y
no se usa en producción).

## 1. Crear la Application

En el dashboard de Dokploy: **Create Project → Application**.

- **Source**: Git → conecta el repo `deandrenn2/triafana`, rama `master`.
- **Build Type**: `Dockerfile`
  - Dockerfile path: `Dockerfile`
  - Build context: `.`
- **Port**: el contenedor escucha en `3000` (definido por `PORT`, expuesto en
  el Dockerfile). Configúralo como el puerto interno en la sección de Domains.

## 2. Variables de entorno

En la pestaña **Environment**, agrega:

```
PAYLOAD_SECRET=<cadena aleatoria larga, p. ej. `openssl rand -base64 32`>
DATABASE_URL=file:./data/trifana-store.db
```

⚠️ `PAYLOAD_SECRET` debe mantenerse **igual** en todos los despliegues (se usa
para firmar sesiones/tokens). Genéralo una vez y no lo cambies.

## 3. Volúmenes persistentes

El contenedor es efímero: sin volúmenes, la base de datos SQLite y las
imágenes subidas se pierden en cada redeploy. En **Advanced → Volumes**,
crea dos montajes:

| Mount path   | Contenido                              |
|--------------|-----------------------------------------|
| `/app/data`  | Base de datos SQLite (`trifana-store.db`) |
| `/app/media` | Archivos subidos a la colección Media   |

Puedes usar "Volumes" (named volume gestionado por Dokploy) o "Binds" (una
ruta del VPS, p. ej. `/etc/dokploy/.../triafana-data`) si prefieres poder
hacer backup del archivo directamente desde el servidor.

## 4. Migraciones de base de datos

El `docker-entrypoint.sh` corre `payload migrate` automáticamente antes de
levantar el servidor en **cada** arranque del contenedor. Es idempotente: las
migraciones ya aplicadas se saltan, así que no hay riesgo en redeploys.

Cuando cambies el schema (colecciones, campos) localmente, genera la
migración antes de hacer push:

```bash
pnpm payload migrate:create
```

y commitea los archivos generados en `src/migrations/`.

## 5. Dominio

En **Domains**, agrega tu dominio (o usa el subdominio gratuito
`*.traefik.me` de Dokploy) apuntando al puerto `3000`, con HTTPS/Let's
Encrypt activado.

## 5.1. Si ves "unable to open database file" / "ConnectionFailed" al arrancar

Esto pasa cuando el volumen que Dokploy monta en `/app/data` (o `/app/media`)
queda con un dueño distinto al usuario `nextjs` (uid 1001) con el que corre
la app dentro del contenedor — típico de un **Bind** a una carpeta del VPS
recién creada, que por defecto queda `root:root`. El contenedor no puede
entonces abrir/crear el archivo SQLite ahí.

Ya no deberías ver esto: el `docker-entrypoint.sh` arranca como root,
corrige el dueño de `/app/data` y `/app/media` en cada boot
(`chown -R nextjs:nodejs`), y recién ahí baja privilegios (`su-exec`) para
correr las migraciones y el servidor. Si de todas formas persiste, revisá
que el volumen esté realmente montado en esas rutas exactas y no en otra.

## 6. Memoria durante el build

El script `build` usa `--max-old-space-size=8000` (8 GB). Si el VPS tiene
menos RAM disponible durante el build, agrega swap en el servidor o baja ese
valor en `package.json` si el build falla por falta de memoria.

## Cambios hechos al repo para este despliegue

- `src/payload.config.ts`: se probó pasar `prodMigrations: migrations` al
  `sqliteAdapter` (para que Payload migre solo al iniciar en producción),
  pero se revirtió: esa opción hace que Payload intente migrar cada vez
  que `NODE_ENV=production` está activo, y `next build` también lo activa
  internamente — así que terminaba intentando migrar la base de datos
  local de desarrollo durante `pnpm build`, y si esa DB tiene drift (típico
  de haber usado modo dev con push), Payload muestra un prompt interactivo
  ("data loss, proceed? y/N") que los workers paralelos del build no
  pueden responder, colgando el build. Las migraciones corren **solo** en
  `docker-entrypoint.sh` vía `payload migrate`, una vez, antes de levantar
  el servidor — nunca durante el build.
- `Dockerfile`: reescrito para copiar el árbol completo de `node_modules` de
  producción (en vez del build "standalone" de Next.js), porque el CLI de
  Payload (`payload migrate`) necesita el árbol de dependencias completo y
  `src/` para funcionar de forma confiable. También crea y da permisos a
  `/app/data` y `/app/media` para los volúmenes.
- `docker-entrypoint.sh` (nuevo): corre las migraciones y luego inicia
  `next start`.
- `.dockerignore` (nuevo): evita copiar `node_modules`/`.next` del host
  (importante si el checkout local es Windows — esos binarios nativos no
  sirven en Linux), y evita filtrar `.env` u otros archivos sensibles al
  contexto de build.
- `package.json`: se agregó el script `migrate` como atajo local, y se
  fijó `packageManager: "pnpm@11.25.0"`. Sin esto, cada build resuelve
  "pnpm latest" de forma independiente (local, Nixpacks, Docker...), y con
  el tiempo eso puede quedar desincronizado con el `pnpm-lock.yaml` — es lo
  que causó el error `ERR_PNPM_LOCKFILE_CONFIG_MISMATCH` en un build por
  Nixpacks. Con la versión fijada, `corepack enable` siempre usa la misma
  versión de pnpm con la que se generó el lockfile.
- `pnpm-workspace.yaml`: se agregó el campo `packages: ['.']`. Sin él,
  `pnpm install --frozen-lockfile` falla con
  `ERROR packages field missing or empty` en cuanto el archivo existe sin
  ese campo (pasa con archivos generados por `pnpm approve-builds`, como
  este). Ver [pnpm#9361](https://github.com/pnpm/pnpm/issues/9361).
- `src/app/(frontend)/Product/ProductCard/ProductCard.tsx`: el botón
  "agregar al carrito" armaba a mano un objeto parcial
  (`{id, name, price: Number(...), image}`) para pasarlo a `addToCart`,
  que espera un `Product` completo (tipo generado por Payload, donde
  `price` es `string`) — eso rompía el build de producción
  (`next build` sí type-checkea; `next dev` es más laxo). Se cambió para
  pasar el `product` completo, igual que en `ProductActions.tsx` y
  `AddToCartButton.tsx`.

- `Dockerfile`: la etapa `builder` ahora corre `payload migrate` (con una
  DB SQLite descartable, `build-placeholder.db`, borrada al final de la
  misma capa) *antes* de `pnpm run build`, y define `PAYLOAD_SECRET`/
  `DATABASE_URL` de relleno solo para esa etapa. Motivo: código como el
  layout de `/Account` llama a `getPayload()` (necesita secreto + conexión
  a DB) durante la recolección de datos de `next build`, incluso en rutas
  que terminan siendo dinámicas — el secreto/DB reales de producción
  jamás se hornean en la imagen (se pasan solo en runtime vía Dokploy).
- `src/app/(frontend)/page.tsx`: se agregó `export const dynamic =
  'force-dynamic'`. La home consulta `banners` directo desde Payload sin
  ningún bailout de API dinámica (`headers()`/`cookies()`), así que Next
  la congelaba como página **estática** en el build — con contenido vacío
  (la DB del build es un placeholder sin datos reales) horneado en la
  imagen. Con esto, la home siempre renderiza contra la base de datos real
  en cada request, y los cambios que hagas en `/admin` (banners, etc.) se
  reflejan sin necesidad de reconstruir la imagen.

Validé el pipeline completo (`pnpm install --frozen-lockfile` → `payload
migrate` con la DB placeholder → `pnpm run build`) en un entorno limpio,
sin `.env` (igual que ve el build de Docker), y terminó sin errores — las
19 rutas se generan correctamente y `/` quedó `ƒ` (dinámica) en vez de
`○` (estática).
