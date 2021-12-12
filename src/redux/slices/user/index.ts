import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { REHYDRATE } from 'redux-persist'
import { UserStatus } from '../../../types'
import getUserToken from '../../../utils/getUserToken'
import createAsyncThunkExtended from '../../helpers/createAsyncThunkExtended'
import { RootState } from '../../types'
import makeExtraReducers from '../../helpers/makeExtraReducers'
import { status } from '../../../api/requests/status'
import { addGlossaries } from '../glossaries'

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

const initialState: InitialState = {
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

export const getStatus = createAsyncThunkExtended(
  `${name}/getStatus`,
  async (_, { dispatch, token }) => {
    try {
      const userToken = token || (await getUserToken())

      const result = await status({ token: userToken })

      dispatch(addGlossaries({ glossaries: result.data.glossaries }))

      return result
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
  name,
  initialState,
  reducers: {
    updateTranslationHistory: (state, { payload }) => {
      if (!payload) return

      const createdAt = new Date().toISOString()

      const { results, searchPhrase, orthographicCorrections } = payload

      const fixedItem = {
        results,
        searchPhrase,
        orthographicCorrections,
        request: {
          q: searchPhrase,
        },
        createdAt,
      }

      state.translationHistory = [fixedItem, ...state.translationHistory]
    },
    clearUserState: (state) => {
      state.translationHistory = undefined
      state.vocabs = undefined
      state.documents = undefined
      state.glossaries = undefined
    },
  },
  extraReducers: {
    ...getStatusSlice,
    [REHYDRATE]: (state, { payload, key }) => {
      if (key === 'user' && payload) {
        const { translationHistory } = payload

        // В предыдущей версии расширения translationHistory был Object, надо отчистить эту запись
        if (!(translationHistory instanceof Array)) {
          state.translationHistory = []
        }
      }
    },
  },
})

export default usersSlice.reducer

export const { updateTranslationHistory, clearUserState } = usersSlice.actions

export * as selectors from './selectors'
