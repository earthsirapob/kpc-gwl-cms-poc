import path from 'path'

import { payloadCloud } from '@payloadcms/plugin-cloud'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'

import Users from './collections/Users'
import Pages from './collections/Pages'
import MyDashboardView from './components/MyDashboardView'
import Account from './components/Account'
import Logo from './components/Logo'
import Icon from './components/Icon'
// import { ChevronRightLinealIcon } from './assets/icons'

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
      views: {
        // Account,
        // Dashboard: MyDashboardView,
      },
    },
  },
  editor: slateEditor({}),
  collections: [Users, Pages],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  localization: {
    locales: ['en', 'th'],
    // locales: [
    //   {
    //     label: 'English',
    //     code: 'en',
    //   },
    //   {
    //     label: 'Thai',
    //     code: 'th',
    //   },
    // ],
    defaultLocale: 'en',
    // fallback: true,
  },
  plugins: [payloadCloud()],
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
