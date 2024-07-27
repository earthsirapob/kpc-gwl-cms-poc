import { CollectionConfig } from 'payload/types'
// import { PageListButton, PageListView } from './components'

const Pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
  ],
  versions: {
    drafts: {
      autosave: true,
    },
  },
  admin: {
    // useAsTitle: 'title',
    listSearchableFields: ['title'],
    defaultColumns: ['title'],
    // components: {
    //   views: {
    //     List: {
    //       Component: PageListView,
    //       actions: [PageListButton],
    //     },
    //   },
    // },
  },
}

export default Pages
