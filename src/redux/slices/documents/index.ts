import { createSlice } from '@reduxjs/toolkit'
import createAsyncThunkExtended from '../../helpers/createAsyncThunkExtended'
import makeExtraReducers from '../../helpers/makeExtraReducers'
// import { getDocumentById } from '../../../api/requests/getDocumentById'
import { uploadDocument as uploadDocumentRequest } from '../../../api/requests/uploadDocument'
import adapter from './adapter'

const name = 'documents'

export type InitialState = {
  flags: {}
  selectedItems: {
    [key: number]: number[]
  }
}

const initialState: InitialState = {
  ...adapter.getInitialState(),
  flags: {},
  selectedItems: {},
}

export type UploadDocument = {
  userDoc: FormData
}

export const uploadDocument = createAsyncThunkExtended(
  `${name}/uploadDocument`,
  async (data: FormData, { token }) => {
    debugger

    return await uploadDocumentRequest({ token, data })
  },
)

export type GetVocab = {
  id: number
}

export const getDocument = createAsyncThunkExtended(
  `${name}/getDocument`,
  async ({ id }: GetVocab, { token }) => {
    // return await getDocumentById({ token, id })
  },
)

const getDocumentSlice = makeExtraReducers({
  action: getDocument,
  extraReducers: {
    fulfilled: (state, { payload: { data } }) => {
      adapter.updateOne(state, { id: data.glossID, changes: { cards: data.cards } })
    },
  },
})

const documentsSlice = createSlice({
  name,
  initialState,
  reducers: {
    selectCard: (state, { payload: { glossaryId, cardId, selected } }) => {
      if (!state.selectedItems[glossaryId]) {
        state.selectedItems[glossaryId] = []
      }

      if (selected) {
        state.selectedItems[glossaryId].push(cardId)
      } else {
        state.selectedItems[glossaryId] = state.selectedItems[glossaryId].filter(
          (id) => id !== cardId,
        )
      }
    },
    selectAll: (state, { payload: { glossaryId, select } }) => {
      const cardIds = [] // TODO

      state.selectedItems[glossaryId] = select ? cardIds : []
    },
    addGlossaries: (state, { payload: { documents } }) => {
      // @ts-ignore
      adapter.addMany(state, documents)
    },
  },
  extraReducers: {
    ...getDocumentSlice,
  },
})

export default documentsSlice.reducer

export const { selectCard, selectAll, addGlossaries } = documentsSlice.actions

export * as selectors from './selectors'
