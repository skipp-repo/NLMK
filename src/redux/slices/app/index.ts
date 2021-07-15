import { createSlice } from '@reduxjs/toolkit'

const name = 'app'

export type InitialState = {
  showTrainingSlider: boolean
}

const initialState: InitialState = {
  showTrainingSlider: true,
}

const appSlice = createSlice({
  name,
  initialState,
  reducers: {
    hideTrainingSlider: (state) => {
      state.showTrainingSlider = false
    },
  },
})

export default appSlice.reducer

export const { hideTrainingSlider } = appSlice.actions

export * as selectors from './selectors'
