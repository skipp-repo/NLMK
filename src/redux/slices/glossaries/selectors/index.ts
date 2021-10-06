import { createSelector } from '@reduxjs/toolkit'
import find from 'lodash.find'
import getImagesFromGlossaries from '../../../../utils/getImagesFromGlossaries'
import glossaries from '../../user/selectors/glossaries'
import { selectAll } from './adapterSelectors'

export const selectedItems = (state) => state.glossaries.selectedItems

export const selectedItemsById = (id) =>
  createSelector(selectedItems, (items) => {
    if (!id || !items) return []

    return items[id]
  })

export const glossariesList = createSelector(glossaries, selectAll)

const glossariesById = (id) =>
  createSelector(glossaries, (items) => {
    if (!id) return {}

    return find(items, { _id: id })
  })

export const glossaryById = (id) =>
  createSelector(
    glossariesById(id),
    glossaries,
    selectedItemsById(id),
    (glossary, glossaries, selectedIds) => {
      if (!glossary || !id) return {}

      return {}

      // return {
      //   ...glossary,
      //   cards: glossary.cards.map((item) => {
      //     if (!item?.glossaries) return item
      //
      //     const itemGlossaries = item?.glossaries
      //
      //     const glossariesGlossaries = item?.glossaries.map((glossaryId) => {
      //       return find(glossaries, { _id: glossaryId })
      //     })
      //
      //     const images = getImagesFromGlossaries(itemGlossaries && itemGlossaries[0], glossaries)
      //
      //     const selected = (selectedIds?.length && selectedIds.includes(item._id)) || false
      //
      //     return {
      //       ...item,
      //       glossaries: glossariesGlossaries,
      //       images,
      //       selected,
      //     }
      //   }),
      // }
    },
  )

export const selectedCardsIdsByVocabId = (id) =>
  createSelector(selectedItemsById(id), glossariesById(id), (ids, glossary) => {
    if (!ids) return []

    return glossary.cards.map(({ _id }) => _id).filter((itemId) => ids.includes(itemId))
  })

export const cardsIdsByVocabId = (id) =>
  createSelector(glossariesById(id), (glossary) => {
    return glossary.cards.map(({ _id }) => _id)
  })
