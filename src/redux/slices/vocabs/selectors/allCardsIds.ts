import { createSelector } from '@reduxjs/toolkit'
import allVocabs from './allVocabs'
import uniq from 'array-uniq'
import flatten from 'arr-flatten'

export default createSelector(allVocabs, (items): number[] => {
  const arraysCardIds = items.map(({ cards }) => {
    return cards.map(({ _id }) => _id)
  })

  return uniq(flatten(arraysCardIds))
})
