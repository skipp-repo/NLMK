import { createSelector } from '@reduxjs/toolkit'
import flatten from 'arr-flatten'
import find from 'lodash.find'

export const user = (state) => state.user
export const token = (state) => state.user.token
export const glossaries = (state) => state.user.glossaries
export const flags = (state) => state.user.flags
export const translationHistory = (state) => state.user.translationHistory

export const history = createSelector(
  glossaries,
  translationHistory,
  (glossariesState, translationState) => {
    if (translationState) {
      const mergedHistory = flatten(translationState.map((item) => item.results))

      return mergedHistory?.map((item) => {
        if (!item?.translation?.glossaries) return item

        const newGlossaries = item?.translation?.glossaries.map((glossaryId) => {
          return find(glossariesState, { _id: glossaryId })
        })

        return {
          ...item,
          translation: {
            ...item.translation,
            glossaries: newGlossaries,
          },
        }
      })
    }
  },
)
