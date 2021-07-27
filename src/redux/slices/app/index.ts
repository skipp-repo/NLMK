import { createSlice } from '@reduxjs/toolkit'

const name = 'app'

export type InitialState = {
  showTrainingSlider: boolean
  installDate: number | undefined
}

const initialState: InitialState = {
  showTrainingSlider: true,
  installDate: undefined,
}

const appSlice = createSlice({
  name,
  initialState,
  reducers: {
    setInstallDate: (state) => {
      state.installDate = Date.now()
    },
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

export const { hideTrainingSlider, showTrainingSlider, setInstallDate } = appSlice.actions

export * as selectors from './selectors'
