import { createSelector } from '@reduxjs/toolkit'
import flatten from 'arr-flatten'
import find from 'lodash.find'
import getImagesFromGlossaries from '../../../../utils/getImagesFromGlossaries'
import { selectAll } from './adapterSelectors'

export const glossaries = (state) => state.glossaries

export const flags = (state) => state.glossaries.flags

export const selectedItems = (state) => state.glossaries.selectedItems

export const allSelectedIds = createSelector(selectedItems, (items) => {
  const arr = Object.keys(items).map((key) => items[key])

  return flatten(arr)
})

export const selectedItemsById = (id) =>
  createSelector(selectedItems, (items) => {
    if (!id || !items) return []

    return items[id]
  })

export const glossariesList = createSelector(glossaries, selectAll)

const glossariesById = (id) =>
  createSelector(glossariesList, (items) => {
    if (!id) return {}

    return find(items, { _id: id })
  })

export const glossaryById = (id) =>
  createSelector(
    glossariesById(id),
    glossariesList,
    selectedItemsById(id),
    (glossary, allGlossaries, selectedIds) => {
      if (!glossary || !id) return {}

      return {
        ...glossary,
        cards: glossary.cards?.map((item) => {
          if (!item?.glossaries) return item

          const itemGlossaries = item?.glossaries

          const updatedGlossaries = item?.glossaries.map((glossaryId) => {
            const res = find(allGlossaries, { _id: glossaryId })

            if (res) {
              const { _id, name, glossaryPicts } = res
              return { _id, name, glossaryPicts }
            }
          })

          const images = getImagesFromGlossaries(
            itemGlossaries && itemGlossaries[0],
            updatedGlossaries,
          )

          const selected = (selectedIds?.length && selectedIds.includes(item._id)) || false

          return {
            ...item,
            glossaries: updatedGlossaries,
            images,
            selected,
          }
        }),
      }
    },
  )

export const selectedCardsIdsByVocabId = (id) =>
  createSelector(selectedItemsById(id), glossariesById(id), (ids, glossary) => {
    if (!ids) return []

    return glossary.cards?.map(({ _id }) => _id).filter((itemId) => ids.includes(itemId)) || []
  })

export const cardsIdsByGlossId = (id) =>
  createSelector(glossaryById(id), (glossary) => {
    return glossary.cards?.map(({ _id }) => _id) || []
  })
