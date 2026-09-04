import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Banners } from './collections/Banners'
import { Products } from './collections/products'
import { Customers } from './collections/Customers'
import { Subcategories } from './collections/Subcategories'
import { Favorites } from './collections/Favorites'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Customers, Favorites, Users, Banners, Media, Products, Subcategories],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || '',
    },
    // Push is only for quick local iteration; once migrations exist we apply
    // schema changes explicitly via `payload migrate` to avoid drift bugs.
    //
    // NOTE: we deliberately do NOT set `prodMigrations` here. That option
    // makes Payload attempt migrations as part of its own init whenever
    // NODE_ENV=production — which `next build` sets internally too, so it
    // ends up trying to migrate whatever DATABASE_URL is active (including
    // a local dev DB) during the build's parallel static-generation
    // workers. If that DB has any drift (e.g. from dev-mode push), Payload
    // shows an interactive "data loss, proceed? (y/N)" prompt that the
    // build workers can't answer, and the build hangs/times out.
    // Migrations run once, explicitly, via `payload migrate` in
    // docker-entrypoint.sh before the server starts — that's the only
    // place they should run.
    push: false,
  }),
  sharp,
  plugins: [],
})
