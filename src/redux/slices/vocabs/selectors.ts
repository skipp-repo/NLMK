import { createSelector } from '@reduxjs/toolkit'
import find from 'lodash.find'
import { glossaries } from '../user/selectors'
import adapter from './adapter'
import { getImagePathFromBuffer } from '../../../utils/getImagePathFromBuffer'

export const { selectIds, selectEntities, selectAll, selectTotal, selectById } =
  adapter.getSelectors()

export const vocabs = (state) => state.vocabs

export const vocabsList = createSelector(vocabs, selectAll)

export const vocabById = (id) =>
  createSelector(
    createSelector(vocabs, (state) => selectById(state, id)),
    glossaries,
    (vocab, glossaries) => {
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

          return {
            ...item,
            glossaries: vocabsGlossaries,
            images,
          }
        }),
      }
    },
  )

export const defaultVocabId = createSelector(
  vocabsList,
  (vocabs) => vocabs.find((item) => item.default)._id,
)
