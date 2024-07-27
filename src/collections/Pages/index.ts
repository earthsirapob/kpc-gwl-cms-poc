import { hero } from '../../fields/hero'
import { RowLabelArgs } from 'payload/dist/admin/components/forms/RowLabel/types'
import { CollectionConfig } from 'payload/types'
// import { PageListButton, PageListView } from './components'

const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    read: () => true, // Make read operation public
  },
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
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [hero],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              // required: true,
              blocks: [],
              // blocks: [CallToAction, Content, MediaBlock, Archive],
            },
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'slider', // required
      type: 'array', // required
      label: 'Image Slider',
      minRows: 2,
      maxRows: 10,
      interfaceName: 'CardSlider', // optional
      labels: {
        singular: 'Slide',
        plural: 'Slides',
      },
      fields: [
        // required
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
      admin: {
        components: {
          RowLabel: ({ data, index }: RowLabelArgs) => {
            return data?.title || `Slide ${String(index).padStart(2, '0')}`
          },
        },
      },
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
