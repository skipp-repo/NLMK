import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import packageJson from '../../../../package.json'
import makeExtraReducers from '../../helpers/makeExtraReducers'
import { RootState } from '../../types'
import { clearUserState } from '../user'

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

export const clearState = createAsyncThunk(
  `${name}/clearState`,
  async (_: void, { getState, dispatch }): Promise<void> => {
    try {
      const state = getState() as RootState
      const {
        app: { version },
      } = state

      if (version !== packageJson.version) {
        dispatch(clearUserState())
      }
    } catch (error) {
      throw error
    }
  },
)

const clearStateSlice = makeExtraReducers({
  action: clearState,
  apiRequest: false,
  extraReducers: {
    fulfilled: (state) => {
      if (state.version !== packageJson.version) {
        state.version = packageJson.version
      }
    },
  },
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
  extraReducers: {
    ...clearStateSlice,
  },
})

export default appSlice.reducer

export const { hideTrainingSlider, showTrainingSlider } = appSlice.actions

export * as selectors from './selectors'
