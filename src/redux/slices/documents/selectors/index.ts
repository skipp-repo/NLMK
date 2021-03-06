import { createSelector } from '@reduxjs/toolkit'
import { selectAll, selectById } from './adapterSelectors'

export const documents = (state) => state.documents

export const flags = (state) => state.documents.flags

export const selectedItems = (state) => state.documents.selectedItems

export const documentsList = createSelector(
  createSelector(documents, selectAll),
  selectedItems,
  (documents, selectedIds) => {
    return documents.map((document) => ({
      ...document,
      selected: selectedIds.includes(document._id),
    }))
  },
)

export const documentById = (id) => createSelector(documents, (state) => selectById(state, id))

export const allNames = createSelector(createSelector(documents, selectAll), (items) =>
  items.map((item) => item.name),
)
