import { createSelector } from '@reduxjs/toolkit'

export const autoCompleteData = (state) => state.autocomplete.data

export const autocompleteByQuery = (query) =>
  createSelector(autoCompleteData, (data) => data[query] || [])
