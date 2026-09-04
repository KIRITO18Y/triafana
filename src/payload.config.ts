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
import { migrations } from './migrations'

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
    push: false,
    // In production (NODE_ENV=production), Payload runs any pending
    // migrations from this list before finishing initialization — a
    // config-level safety net alongside the `payload migrate` step that
    // already runs in docker-entrypoint.sh before the server starts.
    prodMigrations: migrations,
  }),
  sharp,
  plugins: [],
})
