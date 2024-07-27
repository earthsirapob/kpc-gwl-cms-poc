import path from 'path'

import { payloadCloud } from '@payloadcms/plugin-cloud'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { s3Adapter } from '@payloadcms/plugin-cloud-storage/s3'

import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'

// import MyDashboardView from './components/MyDashboardView'
// import Account from './components/Account'
import Logo from './components/Logo'
import Icon from './components/Icon'
import { Users, Pages, Medias } from './collections'
import { cloudStorage } from '@payloadcms/plugin-cloud-storage'
import seo from '@payloadcms/plugin-seo'
import { GenerateTitle } from '@payloadcms/plugin-seo/dist/types'
// import { lexicalEditor } from '@payloadcms/richtext-lexical'
// import { ChevronRightLinealIcon } from './assets/icons'

const generateTitle: GenerateTitle = () => {
  return 'My Store'
}

const storageAdapter = s3Adapter({
  config: {
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_KEY,
    },
  },
  bucket: process.env.S3_BUCKET_NAME,
})

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    components: {
      graphics: {
        Icon,
        Logo,
      },
      // views: {
      // Account,
      // Dashboard: MyDashboardView,
      // },
    },
  },
  // editor: lexicalEditor({}),
  editor: slateEditor({}),
  collections: [Users, Pages, Medias],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  localization: {
    locales: ['en', 'th'],
    defaultLocale: 'en',
    fallback: true,
  },
  cors: '*',
  rateLimit: {
    trustProxy: true,
  },
  plugins: [
    payloadCloud(),
    seo({
      collections: ['pages', 'products'],
      generateTitle,
      uploadsCollection: 'media',
    }),
    cloudStorage({
      collections: {
        media: {
          adapter: storageAdapter,
        },
      },
    }),
  ],
  db: postgresAdapter({
    pool: {
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: '1234',
      database: 'kpc-gwl-cms',
    },
  }),
})
