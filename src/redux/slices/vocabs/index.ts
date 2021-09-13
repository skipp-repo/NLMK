import { createSlice, current } from '@reduxjs/toolkit'
import { createVocabFolder } from '../../../api/requests/createVocabFolder'
import { editVocabFolder } from '../../../api/requests/editVocabFolder'
import createAsyncThunkExtended from '../../helpers/createAsyncThunkExtended'
import makeExtraReducers from '../../helpers/makeExtraReducers'
import { getVocabById } from '../../../api/requests/getVocabById'
import { getVocabs as getVocabsRequest } from '../../../api/requests/getVocabs'
import { removeVocabFolder } from '../../../api/requests/deleteVocabFolder'
import adapter from './adapter'
import * as selectors from '../vocabs/selectors'

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

export type CreateFolder = { name: string; cardsToAdd?: number[] }

export const createFolder = createAsyncThunkExtended(
  `${name}/createFolder`,
  async ({ name, cardsToAdd }: CreateFolder, { token }) => {
    return await createVocabFolder({ token, name, cardsToAdd })
  },
)

export type EditFolder = { id: number; name: string; cardsToAdd: number[]; cardsToRemove: number[] }

export const editFolder = createAsyncThunkExtended(
  `${name}/editFolder`,
  async ({ id, name, cardsToAdd, cardsToRemove }: EditFolder, { token }) => {
    return await editVocabFolder({ token, id, name, cardsToAdd, cardsToRemove })
  },
)

export const addToDefaultFolder = createAsyncThunkExtended(
  `${name}/addToDefaultFolder`,
  async ({ cardsToAdd }: EditFolder, { token, state }) => {
    return await editVocabFolder({
      token,
      id: 'default',
      cardsToAdd,
      cardsToRemove: [],
    })
  },
)

export type RemoveFolder = {
  id: number
}

export const removeFolder = createAsyncThunkExtended(
  `${name}/removeFolder`,
  async ({ id }: RemoveFolder, { token }) => {
    return await removeVocabFolder({ token, id })
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

const createFolderSlice = makeExtraReducers({
  action: createFolder,
  extraReducers: {
    fulfilled: (state, { payload: { data } }) => {
      adapter.addOne(state, data)
    },
  },
})

const editFolderSlice = makeExtraReducers({
  action: editFolder,
  extraReducers: {
    fulfilled: (state, { payload: { data } }) => {},
  },
})

const removeFolderSlice = makeExtraReducers({
  action: removeFolder,
  extraReducers: {
    fulfilled: (
      state,
      {
        payload: { data },
        meta: {
          arg: { id },
        },
      },
    ) => {
      adapter.removeOne(state, id)
      adapter.updateOne(state, data) // TODO проверить
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
    ...createFolderSlice,
    ...editFolderSlice,
    ...removeFolderSlice,
  },
})

export default vocabsSlice.reducer

export const {} = vocabsSlice.actions

export * as selectors from '../vocabs/selectors'
