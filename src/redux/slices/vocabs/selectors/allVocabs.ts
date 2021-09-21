import { createSelector } from '@reduxjs/toolkit'
import { selectAll } from './adapterSelectors'
import vocabs from './vocabs'

export default createSelector(vocabs, selectAll)
