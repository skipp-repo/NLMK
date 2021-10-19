import { createSelector } from '@reduxjs/toolkit'
import { selectAll } from './adapterSelectors'

export const documents = (state) => state.documents

export const selectedItems = (state) => state.glossaries.selectedItems

export const selectedItemsById = (id) =>
  createSelector(selectedItems, (items) => {
    if (!id || !items) return []

    return items[id]
  })

export const documentsList = createSelector(documents, selectAll)
