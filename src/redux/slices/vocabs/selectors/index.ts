import { createSelector } from '@reduxjs/toolkit'
import flatten from 'arr-flatten'
import find from 'lodash.find'
import getImagesFromGlossaries from '../../../../utils/getImagesFromGlossaries'
import glossaries from '../../user/selectors/glossaries'
import { selectAll, selectById } from './adapterSelectors'
import allVocabs from './allVocabs'
import vocabs from './vocabs'
import { vocabs as userVocabs } from '../../user/selectors'

export const selectedItems = (state) => state.vocabs.selectedItems

export const flags = (state) => state.vocabs.flags

export const vocabsList = createSelector(vocabs, selectAll)

const vocabsById = (id) => createSelector(vocabs, (state) => selectById(state, id))

export const vocabById = (id) =>
  createSelector(vocabsById(id), glossaries, selectedItems, (vocab, glossaries, selectedIds) => {
    if (!vocab) return {}

    return {
      ...vocab,
      cards: vocab.cards.map((item) => {
        if (!item?.glossaries) return item

        const itemGlossaries = item?.glossaries

        const vocabsGlossaries = item?.glossaries.map((glossaryId) => {
          return find(glossaries, { _id: glossaryId })
        })

        const images = getImagesFromGlossaries(itemGlossaries && itemGlossaries[0], glossaries)

        const selected =
          selectedIds === 'all' || (selectedIds?.length && selectedIds.includes(item._id)) || false

        return {
          ...item,
          glossaries: vocabsGlossaries,
          images,
          selected,
        }
      }),
    }
  })

const findDefaultVocab = (item) => item.default

export const defaultVocabId = createSelector(vocabsList, userVocabs, (vocabs, userVocabs) => {
  const defaultVocab = vocabs?.find(findDefaultVocab) || userVocabs?.find(findDefaultVocab)
  return defaultVocab._id
})

export const cardsIdsByVocabId = (id) =>
  createSelector(vocabsById(id), (vocab) => {
    return vocab.cards.map(({ _id }) => _id)
  })

export const dropdownVocabs = (activeTab: number, vocabIdsForMoving: number[]) =>
  createSelector(vocabsList, (vocabs) =>
    vocabs
      .filter(({ _id }) => activeTab !== _id)
      .map(({ _id, name, ...item }) => {
        return {
          id: _id,
          name: item.default ? 'Default' : name,
          checked: vocabIdsForMoving.includes(_id),
        }
      }),
  )

export { allVocabs, vocabs }
