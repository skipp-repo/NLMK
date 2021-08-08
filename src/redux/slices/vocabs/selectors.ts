import { createSelector } from '@reduxjs/toolkit'
import adapter from './adapter'

const { selectIds, selectEntities, selectAll, selectTotal, selectById } = adapter.getSelectors()

export const vocabs = (state) => state.vocabs

export const vocabsList = createSelector(vocabs, selectAll)

export const vocabById = (id) => createSelector(vocabs, (state) => selectById(state, id))
