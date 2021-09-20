import { createSelector } from '@reduxjs/toolkit'
import find from 'lodash.find'
import flatten from 'arr-flatten'
import uniq from 'array-uniq'
import { glossaries } from '../user/selectors'
import adapter from './adapter'
import { getImagePathFromBuffer } from '../../../utils/getImagePathFromBuffer'

export const { selectIds, selectEntities, selectAll, selectTotal, selectById } =
  adapter.getSelectors()

export const vocabs = (state) => state.vocabs

export const selectedItems = (state) => state.vocabs.selectedItems

export const selectedItemsById = (id) => createSelector(selectedItems, (items) => items[id])

export const vocabsList = createSelector(vocabs, selectAll)

const vocabsById = (id) => createSelector(vocabs, (state) => selectById(state, id))

export const vocabById = (id) =>
  createSelector(
    vocabsById(id),
    glossaries,
    selectedItemsById(id),
    (vocab, glossaries, selectedIds) => {
      if (!vocab) return {}

      return {
        ...vocab,
        cards: vocab.cards.map((item) => {
          if (!item?.glossaries) return item

          const vocabsGlossaries = item?.glossaries.map((glossaryId) => {
            return find(glossaries, { _id: glossaryId })
          })

          const glossaryPicts = vocabsGlossaries.length ? vocabsGlossaries[0].glossaryPicts : {}

          const sizes = [glossaryPicts.size1, glossaryPicts.size2, glossaryPicts.size3].filter(
            (item) => !!item,
          )

          const images = sizes.map((item) => getImagePathFromBuffer(item.data))

          const selected =
            selectedIds === 'all' ||
            (selectedIds?.length && selectedIds.includes(item._id)) ||
            false

          return {
            ...item,
            glossaries: vocabsGlossaries,
            images,
            selected,
          }
        }),
      }
    },
  )

export const defaultVocabId = createSelector(
  vocabsList,
  (vocabs) => vocabs.find((item) => item.default)._id,
)

export const selectedCardsIdsByVocabId = (id) =>
  createSelector(selectedItemsById(id), vocabsById(id), (ids, vocab) => {
    if (!ids) return []

    return vocab.cards.map(({ _id }) => _id).filter((itemId) => ids.includes(itemId))
  })

export const cardsIdsByVocabId = (id) =>
  createSelector(vocabsById(id), (vocab) => {
    return vocab.cards.map(({ _id }) => _id)
  })

const allVocabs = createSelector(vocabs, selectAll)

export const allCardsIds = createSelector(allVocabs, (items) => {
  const arraysCardIds = items.map(({ cards }) => {
    return cards.map(({ _id }) => _id)
  })

  return uniq(flatten(arraysCardIds))
})
