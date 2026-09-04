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

## 6. Memoria durante el build

El script `build` usa `--max-old-space-size=8000` (8 GB). Si el VPS tiene
menos RAM disponible durante el build, agrega swap en el servidor o baja ese
valor en `package.json` si el build falla por falta de memoria.

## Cambios hechos al repo para este despliegue

- `src/payload.config.ts`: se le pasa `prodMigrations: migrations` al
  `sqliteAdapter`. Con `NODE_ENV=production` (ya seteado en el Dockerfile),
  Payload revisa y corre cualquier migración pendiente de `src/migrations`
  como parte de su inicialización, antes de aceptar tráfico — es un
  respaldo a nivel de config, además del `payload migrate` explícito que
  ya corre en `docker-entrypoint.sh`. Ambos son idempotentes, así que no
  hay problema en que coexistan.
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
- `package.json`: se agregó el script `migrate` como atajo local.
