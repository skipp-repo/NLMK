import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import createRequest from '../../../utils/createRequest'
import { TranslationRequest, TranslationResult } from '../../../types'
import getUserToken from '../../../utils/getUserToken'
import { RootState } from '../../types'
import makeExtraReducers from '../../helpers/makeExtraReducers'

const name = 'translation'

export type InitialState = {
  flags: {}
}

const initialState: InitialState = {
  flags: {},
}

export type Space = 'Popup' | 'Documents'

const defaultSpace: Space = 'Popup'

export type Translate = {
  query: string
  filters: TranslationRequest['filters']
  space: Space
}

export const translate = createAsyncThunk(
  `${name}/translate`,
  async ({ query, filters, space }: Translate, { getState }): Promise<TranslationResult> => {
    try {
      const state = getState() as RootState
      const { user } = state

      const token = user.token || (await getUserToken())

      const params: TranslationRequest = {
        q: query,
        filters,
      }

      return await createRequest(`/translation`, {
        method: 'POST',
        headers: {
          'X-USER-ID': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })
    } catch (error) {
      throw error
    }
  },
)

const translateSlice = makeExtraReducers({
  action: translate,
  extraReducers: {
    fulfilled: (
      state,
      {
        meta: {
          arg: { space },
        },
        payload: {
          data: { searchPhrase, orthographicCorrections, results },
        },
      },
    ) => {
      state[space || defaultSpace] = {
        searchPhrase,
        orthographicCorrections,
        results,
      }
    },
  },
})

const translationSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: {
    ...translateSlice,
  },
})

export default translationSlice.reducer

export * as selectors from './selectors'