import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import getUserToken from '../../../utils/getUserToken'
import { RootState } from '../../types'
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

export const getVocabs = createAsyncThunk(`${name}/getVocabs`, async (_: void, { getState }) => {
  try {
    const state = getState() as RootState
    const { user } = state

    const { vocabs } = user

    const token = user.token || (await getUserToken())

    return await getVocabsRequest({ token })
  } catch (error) {
    throw error
  }
})

export type GetVocab = {
  id: number
}

export const getVocab = createAsyncThunk(
  `${name}/getVocab`,
  async ({ id }: GetVocab, { getState }) => {
    try {
      const state = getState() as RootState
      const { user } = state

      const { vocabs } = user

      const token = user.token || (await getUserToken())

      return await getVocabById({ token, id })
    } catch (error) {
      throw error
    }
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
