import { createSlice } from '@reduxjs/toolkit'
import { createVocabFolder } from '../../../api/requests/createVocabFolder'
import { EditVocabFolder, editVocabFolder } from '../../../api/requests/editVocabFolder'
import createAsyncThunkExtended from '../../helpers/createAsyncThunkExtended'
import makeExtraReducers from '../../helpers/makeExtraReducers'
import { getVocabById } from '../../../api/requests/getVocabById'
import { getVocabs as getVocabsRequest } from '../../../api/requests/getVocabs'
import { removeVocabFolder } from '../../../api/requests/deleteVocabFolder'
import { HandlerAction } from '../../types'
import { cardsIdsByGlossId } from '../glossaries/selectors'
import adapter from './adapter'
import { cardsIdsByVocabId, defaultVocabId } from './selectors'

const name = 'vocabs'

export type InitialState = {
  flags: {}
  selectedItems: number[]
}

const initialState: InitialState = {
  flags: {},
  ...adapter.getInitialState(),
  selectedItems: [],
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

export type EditFolder = Omit<EditVocabFolder, 'token'>

export const editFolder = createAsyncThunkExtended<any, EditFolder>(
  `${name}/editFolder`,
  async ({ id, name, cardsToAdd, cardsToRemove }, { token, state }) => {
    const defaultId = defaultVocabId(state)

    return await editVocabFolder({
      token,
      id: id === defaultId ? 'default' : id,
      name,
      cardsToAdd,
      cardsToRemove,
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
    pending: (
      state,
      {
        meta: {
          arg: { id, name, cardsToAdd, cardsToRemove },
        },
      },
    ) => {
      if (name) {
        adapter.updateOne(state, { id, changes: { name } })
      }
    },
    fulfilled: (state, { payload: { data } }) => {
      if (!state.ids.length) {
        adapter.addOne(state, data)
      } else {
        adapter.updateOne(state, { id: data._id, changes: data })
      }
    },
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

type SelectCardParams = HandlerAction<{
  cardId: number
  selected: boolean
}>

type SelectAllParams = HandlerAction<{
  vocabId: number
  select: boolean
}>

const vocabsSlice = createSlice({
  name,
  initialState,
  reducers: {
    selectCard: (state, { payload: { cardId, selected } }: SelectCardParams) => {
      if (selected) {
        state.selectedItems.push(cardId)
      } else {
        state.selectedItems = state.selectedItems.filter((id) => id !== cardId)
      }
    },
    selectAll: (state, { payload: { vocabId, select } }: SelectAllParams) => {
      const cardIds = cardsIdsByVocabId(vocabId)({ vocabs: state })

      state.selectedItems = select ? cardIds : []
    },
  },
  extraReducers: {
    ...getVocabsSlice,
    ...getVocabSlice,
    ...createFolderSlice,
    ...editFolderSlice,
    ...removeFolderSlice,
  },
})

export default vocabsSlice.reducer

export const { selectCard, selectAll } = vocabsSlice.actions

export * as selectors from './selectors'
