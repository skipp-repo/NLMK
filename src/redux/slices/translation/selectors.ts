import { createSelector } from '@reduxjs/toolkit'
import find from 'lodash.find'
import { glossaries } from '../user/selectors'

export const translation = (state) => state.translation

export const translationFlags = (state) => state.translation.flags

export const popupSearchResults = createSelector(
  glossaries,
  translation,
  (glossariesState, translationState) => {
    const translationArr = translationState?.Popup
    if (translationArr) {
      const updatedResults = translationArr?.results?.map((item) => {
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

      return {
        ...translationArr,
        results: updatedResults,
      }
    }
  },
)
