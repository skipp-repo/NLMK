import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { autocomplete as autocompleteRequest } from '../../../api/requests/autocomplete'
import { RootState } from '../../types'
import makeExtraReducers from '../../helpers/makeExtraReducers'

const name = 'autocomplete'

export type InitialState = {
  flags: {}
  data: {}
}

const initialState: InitialState = {
  flags: {},
  data: {},
}

export type Autocomplete = {
  query: string
}

export type AutoCompleteResult = {
  status: number
  error?: string
  data?: string[]
}

export const autocomplete = createAsyncThunk(
  `${name}/autocomplete`,
  async ({ query }: Autocomplete, { getState }): Promise<AutoCompleteResult> => {
    try {
      const state = getState() as RootState
      const { autocomplete } = state

      if (autocomplete.data[query]) {
        return {
          data: autocomplete.data[query],
          status: 200,
        }
      }

      return await autocompleteRequest({
        q: query,
      })
    } catch (error) {
      throw error
    }
  },
)

const autocompleteSlice = makeExtraReducers({
  action: autocomplete,
  extraReducers: {
    fulfilled: (
      state,
      {
        payload: { data },
        meta: {
          arg: { query },
        },
      },
    ) => {
      state.data[query] = data.filter((item) => item !== query)
    },
  },
})

const indexSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: {
    ...autocompleteSlice,
  },
})

export default indexSlice.reducer

export * as selectors from './selectors'
