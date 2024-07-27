import { Props } from 'payload/dist/admin/components/views/collections/List/types'
import React from 'react'

export const PageListView: React.FC<Props> = (props) => {
  console.log(props)
  return <div>{props.collection.slug}</div>
}

export default PageListView
