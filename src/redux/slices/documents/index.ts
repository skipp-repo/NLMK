import { createSlice } from '@reduxjs/toolkit'
import getUniqNameForDocument from '../../../utils/getUniqNameForDocument'
import createAsyncThunkExtended from '../../helpers/createAsyncThunkExtended'
import makeExtraReducers from '../../helpers/makeExtraReducers'
// import { getDocumentById } from '../../../api/requests/getDocumentById'
import {
  UploadDocument,
  uploadDocument as uploadDocumentRequest,
} from '../../../api/requests/uploadDocument'
import {
  UpdateDocument,
  updateDocument as updateDocumentRequest,
} from '../../../api/requests/updateDocument'
import { getDocuments as getDocumentsRequest } from '../../../api/requests/getDocuments'
import { deleteDocument as deleteDocumentRequest } from '../../../api/requests/deleteDocument'
import { deleteDocumentsByIds as deleteDocumentsRequest } from '../../../api/requests/deleteDocumentsById'
import { getDocumentById as getDocumentByIdRequest } from '../../../api/requests/getDocumentById'
import {
  RenameDocument,
  renameDocument as renameDocumentRequest,
} from '../../../api/requests/renameDocument'
import adapter from './adapter'
import { allNames } from './selectors'

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

export type UploadDocumentAction = Omit<UploadDocument, 'token' | 'data'> & {
  file?: File
}

export const uploadDocument = createAsyncThunkExtended(
  `${name}/uploadDocument`,
  async ({ file, documentHTML, documentName }: UploadDocumentAction, { token, state }) => {
    const namesArr = allNames(state)

    if (documentHTML) {
      const name = getUniqNameForDocument(documentName, namesArr)

      return await uploadDocumentRequest({ token, documentHTML, documentName: name })
    }

    if (file) {
      const data = new FormData()

      const name = getUniqNameForDocument(file.name, namesArr)

      data.append('userDoc', file, name)

      return await uploadDocumentRequest({ token, data })
    }
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

export const updateDocument = createAsyncThunkExtended(
  `${name}/updateDocument`,
  async ({ id, documentHTML, documentName }: Omit<UpdateDocument, 'token'>, { token }) => {
    return await updateDocumentRequest({ token, id, documentHTML, documentName })
  },
)

const updateDocumentSlice = makeExtraReducers({
  action: updateDocument,
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
  id: string
}

export const getDocument = createAsyncThunkExtended<any, GetDocument>(
  `${name}/getDocument`,
  async ({ id }, { token }) => {
    return await getDocumentByIdRequest({ token, id })
  },
)

const getDocumentSlice = makeExtraReducers({
  action: getDocument,
  extraReducers: {
    fulfilled: (state, { payload: { data } }) => {
      adapter.updateOne(state, { id: data._id, changes: data })
    },
  },
})

export const renameDocument = createAsyncThunkExtended(
  `${name}/renameDocument`,
  async ({ id, newName }: Omit<RenameDocument, 'token'>, { token }) => {
    return await renameDocumentRequest({ token, id, newName })
  },
)

const renameDocumentSlice = makeExtraReducers({
  action: renameDocument,
  extraReducers: {
    fulfilled: (
      state,
      {
        meta: {
          arg: { id, newName },
        },
      },
    ) => {
      adapter.updateOne(state, { id: id, changes: { name: newName } })
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
    ...updateDocumentSlice,
    ...renameDocumentSlice,
  },
})

export default documentsSlice.reducer

export const { selectItem, selectAll, addGlossaries } = documentsSlice.actions

export * as selectors from './selectors'
