import { createSelector } from '@reduxjs/toolkit'
import find from 'lodash.find'
import { getImagePathFromBuffer } from '../../../utils/getImagePathFromBuffer'

export const user = (state) => state.user
export const token = (state) => state.user.token
export const glossaries = (state) => state.user.glossaries
export const vocabs = (state) => state.user.vocabs
export const flags = (state) => state.user.flags
export const translationHistory = (state) => state.user.translationHistory

export const history = createSelector(
  glossaries,
  translationHistory,
  (glossariesState, historyState) => {
    if (historyState) {
      return historyState.map((item) => {
        const updatedResults = item.results?.map((item) => {
          return item.map((item) => {
            if (!item?.translation?.glossaries) return item

            const vocabsGlossaries = item?.translation?.glossaries.map((glossaryId) => {
              return find(glossariesState, { _id: glossaryId })
            })

            const glossaryPicts = vocabsGlossaries.length ? vocabsGlossaries[0].glossaryPicts : {}

            const sizes = [glossaryPicts.size1, glossaryPicts.size2, glossaryPicts.size3].filter(
              (item) => !!item,
            )

            const images = sizes.map((item) => getImagePathFromBuffer(item.data))

            return {
              ...item,
              translation: {
                ...item.translation,
                glossaries: vocabsGlossaries,
              },
              images,
            }
          })
        })

        return { ...item, results: updatedResults }
      })
    }
  },
)
