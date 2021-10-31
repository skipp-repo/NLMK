import { createSlice } from '@reduxjs/toolkit'
import createAsyncThunkExtended from '../../helpers/createAsyncThunkExtended'
import makeExtraReducers from '../../helpers/makeExtraReducers'
// import { getDocumentById } from '../../../api/requests/getDocumentById'
import { uploadDocument as uploadDocumentRequest } from '../../../api/requests/uploadDocument'
import { getDocuments as getDocumentsRequest } from '../../../api/requests/getDocuments'
import { deleteDocument as deleteDocumentRequest } from '../../../api/requests/deleteDocument'
import { deleteDocumentsByIds as deleteDocumentsRequest } from '../../../api/requests/deleteDocumentsById'
import { getDocumentById as getDocumentByIdRequest } from '../../../api/requests/getDocumentById'
import adapter from './adapter'

const name = 'documents'

export type InitialState = {
  flags: {}
  selectedItems: number[]
}

const initialState: InitialState = {
  ...adapter.getInitialState(),
  flags: {},
  selectedItems: [],
}

export const uploadDocument = createAsyncThunkExtended(
  `${name}/uploadDocument`,
  async (data: FormData, { token }) => {
    return await uploadDocumentRequest({ token, data })
  },
)

const uploadDocumentSlice = makeExtraReducers({
  action: uploadDocument,
  extraReducers: {
    fulfilled: (state, { payload: { data } }) => {
      adapter.addOne(state, data)
    },
  },
})

export const getDocuments = createAsyncThunkExtended(
  `${name}/getDocuments`,
  async (_, { token }) => {
    return await getDocumentsRequest({ token })
  },
)

const getDocumentsSlice = makeExtraReducers({
  action: getDocuments,
  extraReducers: {
    fulfilled: (state, { payload: { data } }) => {
      adapter.addMany(state, data)
    },
  },
})

export type DeleteDocument = {
  id: number
}

export const deleteDocument = createAsyncThunkExtended(
  `${name}/deleteDocument`,
  async ({ id }: DeleteDocument, { token }) => {
    return await deleteDocumentRequest({ token, id })
  },
)

const deleteDocumentSlice = makeExtraReducers({
  action: deleteDocument,
  extraReducers: {
    pending: (
      state,
      {
        meta: {
          arg: { id },
        },
      },
    ) => {
      adapter.removeOne(state, id)
    },
  },
})

export type DeleteDocuments = {
  docIds: number[]
}

export const deleteDocuments = createAsyncThunkExtended(
  `${name}/deleteDocuments`,
  async ({ docIds }: DeleteDocuments, { token }) => {
    return await deleteDocumentsRequest({ token, docIds })
  },
)

const deleteDocumentsSlice = makeExtraReducers({
  action: deleteDocuments,
  extraReducers: {
    pending: (
      state,
      {
        meta: {
          arg: { docIds },
        },
      },
    ) => {
      adapter.removeMany(state, docIds)
    },
  },
})

export type GetDocument = {
  id: number
}

export const getDocument = createAsyncThunkExtended(
  `${name}/getDocument`,
  async ({ id }: GetDocument, { token }) => {
    return await getDocumentByIdRequest({ token, id })
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
    selectItem: (state, { payload: { _id, selected } }) => {
      if (selected) {
        state.selectedItems.push(_id)
      } else {
        state.selectedItems = state.selectedItems.filter((id) => id !== _id)
      }
    },
    selectAll: (state, { payload: { select } }) => {
      state.selectedItems = select ? state['ids'] : []
    },
    addGlossaries: (state, { payload: { documents } }) => {
      // @ts-ignore
      adapter.addMany(state, documents)
    },
  },
  extraReducers: {
    ...getDocumentSlice,
    ...getDocumentsSlice,
    ...deleteDocumentSlice,
    ...uploadDocumentSlice,
    ...deleteDocumentsSlice,
  },
})

export default documentsSlice.reducer

export const { selectItem, selectAll, addGlossaries } = documentsSlice.actions

export * as selectors from './selectors'
