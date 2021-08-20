import { createSelector } from '@reduxjs/toolkit'
import find from 'lodash.find'
import { glossaries } from '../user/selectors'
import adapter from './adapter'

const { selectIds, selectEntities, selectAll, selectTotal, selectById } = adapter.getSelectors()

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

          return {
            ...item,
            glossaries: item?.glossaries.map((glossaryId) => {
              return find(glossaries, { _id: glossaryId })
            }),
          }
        }),
      }
    },
  )
