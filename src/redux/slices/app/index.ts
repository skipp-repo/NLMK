import { createSlice } from '@reduxjs/toolkit'
import createAsyncThunkExtended from '../../helpers/createAsyncThunkExtended'
import { removeVocabFolder } from '../../../api/requests/deleteVocabFolder'
import { getVocabs, RemoveFolder } from '../vocabs'
import { getStatus } from '../user'

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

export const getData = createAsyncThunkExtended(`${name}/getData`, async (_, { dispatch }) => {
  // @ts-ignore
  dispatch(getVocabs())
  // @ts-ignore
  dispatch(getStatus())
})

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
