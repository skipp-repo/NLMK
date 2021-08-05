import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createVocabFolder } from '../../../api/requests/createVocabFolder'
import createAsyncThunkExtended from '../../helpers/createAsyncThunkExtended'
import makeExtraReducers from '../../helpers/makeExtraReducers'
import { getVocabById } from '../../../api/requests/getVocabById'
import { getVocabs as getVocabsRequest } from '../../../api/requests/getVocabs'
import adapter from './adapter'

const name = 'vocabs'

export type InitialState = {
  flags: {}
}

const initialState: InitialState = {
  flags: {},
  ...adapter.getInitialState(),
}

export const getVocabs = createAsyncThunkExtended(
  `${name}/getVocabs`,
  async (_: void, { token }) => {
    return await getVocabsRequest({ token })
  },
)

export type GetVocab = {
  id: number
}

export const getVocab = createAsyncThunkExtended(
  `${name}/getVocab`,
  async ({ id }: GetVocab, { state, token }) => {
    const { user } = state

    return await getVocabById({ token, id })
  },
)

export type CreateFolder = { name: string; cardsToAdd: number[] }

export const createFolder = createAsyncThunkExtended(
  `${name}/createFolder`,
  async ({ name, cardsToAdd }: CreateFolder, { token }) => {
    return await createVocabFolder({ token, name, cardsToAdd })
  },
)
const getVocabsSlice = makeExtraReducers({
  action: getVocabs,
  extraReducers: {
    fulfilled: (state, { payload: { data } }) => {
      adapter.setAll(state, data)
    },
  },
})

const getVocabSlice = makeExtraReducers({
  action: getVocab,
  extraReducers: {
    fulfilled: (state, { payload: { data } }) => {
      adapter.addOne(state, data)
    },
  },
})

const vocabsSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: {
    ...getVocabsSlice,
    ...getVocabSlice,
  },
})

export default vocabsSlice.reducer

export const {} = vocabsSlice.actions

export * as selectors from '../user/selectors'
