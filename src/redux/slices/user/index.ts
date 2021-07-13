import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import chromep from 'chrome-promise'
import createRequest from '../../../utils/createRequest'
import { UserStatus } from '../../../types'
import { isDevServer } from '../../../constantes'

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
      const userData = !isDevServer ? chromep.identity.getProfileUserInfo() : 'testUser'

      return await createRequest(`/user/status`, {
        headers: {
          'X-USER-ID': userData.email,
        },
      })
    } catch (error) {
      throw error
    }
  },
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [getStatus.pending.type]: (state) => {
      state.flags.getStatusLoading = true
    },
    [getStatus.fulfilled.type]: (
      state,
      {
        payload: {
          data: { token, translationHistory, vocabs, documents, glossaries, newUser },
          status,
          error,
        },
      },
    ) => {
      state.flags.getStatusLoading = false

      if (status !== 200 || error) {
        state.flags.getStatusError = error || `Server Code ${status}`
        return
      }

      state.token = token
      state.translationHistory = translationHistory
      state.vocabs = vocabs
      state.documents = documents
      state.glossaries = glossaries
      state.newUser = newUser
    },
    [getStatus.rejected.type]: (state, { error }) => {
      state.flags.getStatusLoading = false
      state.flags.getStatusError = error
    },
  },
})

export default usersSlice.reducer
