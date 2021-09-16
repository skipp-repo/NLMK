import { createSelector } from '@reduxjs/toolkit'
import find from 'lodash.find'
import flatten from 'arr-flatten'
import { glossaries } from '../user/selectors'
import { getImagePathFromBuffer } from '../../../utils/getImagePathFromBuffer'
import sortTranslationByCommon from '../../../utils/sortTranslationByCommon'

export const translation = (state) => state.translation

export const translationFlags = (state) => state.translation.flags

export const popupSearchResults = createSelector(
  glossaries,
  translation,
  (glossariesState, translationState) => {
    const translationArr = translationState?.Popup
    if (translationArr) {
      const updatedResults = translationArr?.results?.map((item) => {
        const sortedItems = [...item].sort(sortTranslationByCommon)

        return sortedItems.map((item) => {
          if (!item?.translation?.glossaries) return item

          const vocabsGlossaries = item?.translation?.glossaries.map((glossaryId) => {
            const { _id, name } = find(glossariesState, { _id: glossaryId })

            return { _id, name }
          })

          const glossaryId = item?.translation?.glossaries?.length
            ? item?.translation?.glossaries[0]
            : undefined

          const { glossaryPicts } = find(glossariesState, { _id: glossaryId })

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

      return {
        ...translationArr,
        results: updatedResults,
      }
    }
  },
)
