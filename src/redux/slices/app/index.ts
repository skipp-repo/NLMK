import { createSlice } from '@reduxjs/toolkit'

const name = 'app'

export type InitialState = {
  flags: any
  version: string | undefined
  showTrainingSlider: boolean
}

const initialState: InitialState = {
  flags: {},
  version: undefined,
  showTrainingSlider: true,
}

const appSlice = createSlice({
  name,
  initialState,
  reducers: {
    hideTrainingSlider: (state) => {
      state.showTrainingSlider = false
    },
    // {
    //   type: 'app/showTrainingSlider'
    // }
    showTrainingSlider: (state) => {
      state.showTrainingSlider = true
    },
  },
  extraReducers: {},
})

export default appSlice.reducer

export const { hideTrainingSlider, showTrainingSlider } = appSlice.actions

export * as selectors from './selectors'
