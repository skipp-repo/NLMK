import { createSelector } from '@reduxjs/toolkit'
import find from 'lodash.find'
import sortTranslationByCommon from '../../../../utils/sortTranslationByCommon'
import getImagesFromGlossaries from '../../../../utils/getImagesFromGlossaries'
import allCardsIds from '../../vocabs/selectors/allCardsIds'
import glossaries from './glossaries'

export const user = (state) => state.user
export const token = (state) => state.user.token
export const vocabs = (state) => state.user.vocabs
export const flags = (state) => state.user.flags
export const translationHistory = (state) => state.user.translationHistory

export const history = createSelector(
  glossaries,
  translationHistory,
  allCardsIds,
  (glossariesState, historyState, vocabsIds) => {
    if (historyState) {
      return historyState.map((item) => {
        let updatedResults = item.results?.map((item) => {
          const sortedItems = [...item].sort(sortTranslationByCommon)

          return sortedItems?.map((item) => {
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

        return { ...item, results: updatedResults }
      })
    }
  },
)

export { glossaries }
