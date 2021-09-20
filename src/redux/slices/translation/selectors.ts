import { createSelector } from '@reduxjs/toolkit'
import find from 'lodash.find'
import { glossaries } from '../user/selectors'
import { getImagePathFromBuffer } from '../../../utils/getImagePathFromBuffer'
import sortTranslationByCommon from '../../../utils/sortTranslationByCommon'
import { allCardsIds } from '../vocabs/selectors'

export const translation = (state) => state.translation

export const translationFlags = (state) => state.translation.flags

const getImagesFromGlossaries = (glossaryId, glossaries): string[] => {
  if (!glossaries || !glossaryId) return []

  const glossary = glossaryId ? find(glossaries, { _id: glossaryId }) : undefined

  if (!glossary) return []

  const { glossaryPicts } = glossary

  const sizes = [glossaryPicts.size1, glossaryPicts.size2, glossaryPicts.size3].filter(
    (item) => !!item,
  )

  const images = sizes.map((item) => getImagePathFromBuffer(item.data))

  return images
}

export const popupSearchResults = createSelector(
  glossaries,
  translation,
  allCardsIds,
  (glossariesState, translationState, vocabsIds) => {
    const translationArr = translationState?.Popup
    if (translationArr) {
      const updatedResults = translationArr?.results?.map((item) => {
        const sortedItems = [...item].sort(sortTranslationByCommon)

        return sortedItems.map((item) => {
          const itemGlossaries = item?.translation?.glossaries

          const vocabsGlossaries = itemGlossaries
            ? item?.translation?.glossaries.map((glossaryId) => {
                const { _id, name } = find(glossariesState, { _id: glossaryId })

                return { _id, name }
              })
            : []

          const images = getImagesFromGlossaries(
            itemGlossaries && itemGlossaries[0],
            glossariesState,
          )

          return {
            ...item,
            translation: {
              ...item.translation,
              glossaries: vocabsGlossaries,
            },
            images,
            inBookmarks: vocabsIds.includes(item.translation._id),
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
