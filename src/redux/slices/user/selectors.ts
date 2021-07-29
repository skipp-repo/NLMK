import { createSelector } from '@reduxjs/toolkit'
import find from 'lodash.find'

export const user = (state) => state.user
export const token = (state) => state.user.token
export const glossaries = (state) => state.user.glossaries
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
        })

        return { ...item, results: updatedResults }
      })
    }
  },
)
