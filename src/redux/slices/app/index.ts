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
    // {
    //   type: 'app/showTrainingSlider'
    // }
    showTrainingSlider: (state) => {
      state.showTrainingSlider = true
    },
  },
})

export default appSlice.reducer

export const { hideTrainingSlider, showTrainingSlider } = appSlice.actions

console.log(showTrainingSlider.type)

export * as selectors from './selectors'
