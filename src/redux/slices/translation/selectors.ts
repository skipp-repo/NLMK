import { createSelector } from '@reduxjs/toolkit'
import find from 'lodash.find'
import flatten from 'arr-flatten'
import glossaries from '../user/selectors/glossaries'
import sortTranslationByCommon from '../../../utils/sortTranslationByCommon'
import allCardsIds from '../vocabs/selectors/allCardsIds'
import getImagesFromGlossaries from '../../../utils/getImagesFromGlossaries'

export const translation = (state) => state.translation

export const translationFlags = (state) => state.translation.flags

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

          const inBookmarks = vocabsIds.includes(item.translation._id)

          return {
            ...item,
            translation: {
              ...item.translation,
              glossaries: vocabsGlossaries,
            },
            images,
            inBookmarks,
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

export const mainVocabsSearchResults = createSelector(
  glossaries,
  translation,
  allCardsIds,
  (glossariesState, translationState, vocabsIds) => {
    const translationArr = translationState?.MainVocabs

    if (!translationArr) return

    const results = flatten(translationArr?.results)

    const updatedResults = results?.map((item) => {
      const itemGlossaries = item?.translation?.glossaries

      const vocabsGlossaries = itemGlossaries
        ? item?.translation?.glossaries.map((glossaryId) => {
            const { _id, name } = find(glossariesState, { _id: glossaryId })

            return { _id, name }
          })
        : []

      const images = getImagesFromGlossaries(itemGlossaries && itemGlossaries[0], glossariesState)

      return {
        ...item.translation,
        glossaries: vocabsGlossaries,
        images,
      }
    })

    return {
      ...translationArr,
      results: updatedResults,
    }
  },
)

export const glossariesSearchResults = createSelector(
  glossaries,
  translation,
  allCardsIds,
  (glossariesState, translationState, vocabsIds) => {
    const translationArr = translationState?.Glossaries

    if (!translationArr) return

    const results = flatten(translationArr?.results)

    const updatedResults = results?.map((item) => {
      const itemGlossaries = item?.translation?.glossaries

      const vocabsGlossaries = itemGlossaries
        ? item?.translation?.glossaries.map((glossaryId) => {
            const { _id, name } = find(glossariesState, { _id: glossaryId })

            return { _id, name }
          })
        : []

      const images = getImagesFromGlossaries(itemGlossaries && itemGlossaries[0], glossariesState)

      return {
        ...item.translation,
        glossaries: vocabsGlossaries,
        images,
      }
    })

    return {
      ...translationArr,
      results: updatedResults,
    }
  },
)

export const documentsVocabsSearchResults = createSelector(
  glossaries,
  translation,
  allCardsIds,
  (glossariesState, translationState, vocabsIds) => {
    const translationArr = translationState?.DocumentsVocabs

    if (!translationArr) return

    const results = flatten(translationArr?.results)

    const updatedResults = results?.map((item) => {
      const itemGlossaries = item?.translation?.glossaries

      const vocabsGlossaries = itemGlossaries
        ? item?.translation?.glossaries.map((glossaryId) => {
            const { _id, name } = find(glossariesState, { _id: glossaryId })

            return { _id, name }
          })
        : []

      const images = getImagesFromGlossaries(itemGlossaries && itemGlossaries[0], glossariesState)

      return {
        ...item.translation,
        glossaries: vocabsGlossaries,
        images,
      }
    })

    return {
      ...translationArr,
      results: updatedResults,
    }
  },
)

export const documentsGlossariesSearchResults = createSelector(
  glossaries,
  translation,
  allCardsIds,
  (glossariesState, translationState, vocabsIds) => {
    const translationArr = translationState?.DocumentsGlossaries

    if (!translationArr) return

    const results = flatten(translationArr?.results)

    const updatedResults = results?.map((item) => {
      const itemGlossaries = item?.translation?.glossaries

      const vocabsGlossaries = itemGlossaries
        ? item?.translation?.glossaries.map((glossaryId) => {
            const { _id, name } = find(glossariesState, { _id: glossaryId })

            return { _id, name }
          })
        : []

      const images = getImagesFromGlossaries(itemGlossaries && itemGlossaries[0], glossariesState)

      return {
        ...item.translation,
        glossaries: vocabsGlossaries,
        images,
      }
    })

    return {
      ...translationArr,
      results: updatedResults,
    }
  },
)

export const documentsPopupSearchResults = createSelector(
  glossaries,
  translation,
  allCardsIds,
  (glossariesState, translationState, vocabsIds) => {
    const translationArr = translationState?.DocumentsPopup

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

          const inBookmarks = vocabsIds.includes(item.translation._id)

          return {
            ...item,
            translation: {
              ...item.translation,
              glossaries: vocabsGlossaries,
            },
            images,
            inBookmarks,
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
