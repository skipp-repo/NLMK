import { createSelector } from '@reduxjs/toolkit'

export const translation = (state) => state.translation

export const translationFlags = (state) => state.translation.flags

export const popupSearchResults = createSelector(translation, (state) => state.Popup)
