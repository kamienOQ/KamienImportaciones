import React from 'react'
import { Item } from '../item/item'

export const ItemList = ({ data = [] }) => {
  return (
    data.map( categoryId => <Item key={ categoryId } info={ categoryId } />)
  )
}
