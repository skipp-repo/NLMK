import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import createRequest from '../../../utils/createRequest'
import { UserStatus } from '../../../types'
import getUserToken from '../../../utils/getUserToken'
import { RootState } from '../../types'
import makeExtraReducers from '../../helpers/makeExtraReducers'

const name = 'user'

export type InitialState = {
  flags: {
    getStatusError?: string
    getStatusLoading?: boolean
  }
  token?: string
  translationHistory?: UserStatus['translationHistory']
  vocabs?: UserStatus['vocabs']
  documents?: UserStatus['documents']
  glossaries?: UserStatus['glossaries']
  newUser?: UserStatus['newUser']
}

const initialState = {
  flags: {
    getStatusError: undefined,
    getStatusLoading: undefined,
  },
  token: undefined,
  translationHistory: undefined,
  vocabs: undefined,
  documents: undefined,
  glossaries: undefined,
  newUser: undefined,
}

export type GetStatus = {}

export const getStatus = createAsyncThunk(
  `${name}/getStatus`,
  async ({}: GetStatus, { getState }) => {
    try {
      const state = getState() as RootState
      const { user } = state

      const token = user.token || (await getUserToken())

      return await createRequest(`/user/status`, {
        headers: {
          'X-USER-ID': token,
        },
      })
    } catch (error) {
      throw error
    }
  },
)

const getStatusSlice = makeExtraReducers({
  action: getStatus,
  extraReducers: {
    fulfilled: (
      state,
      {
        payload: {
          data: { token, translationHistory, vocabs, documents, glossaries, newUser },
        },
      },
    ) => {
      state.token = token
      state.translationHistory = translationHistory
      state.vocabs = vocabs
      state.documents = documents
      state.glossaries = glossaries
      state.newUser = newUser
    },
  },
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    ...getStatusSlice,
  },
})

export default usersSlice.reducer

export * as selectors from '../user/selectors'
