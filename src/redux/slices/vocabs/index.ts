import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import getUserToken from '../../../utils/getUserToken'
import { RootState } from '../../types'
import makeExtraReducers from '../../helpers/makeExtraReducers'
import { getVocabById } from '../../../api/requests/getVocabById'

const name = 'vocabs'

export type InitialState = {
  flags: {}
}

const initialState: InitialState = {
  flags: {},
}

export const getVocabs = createAsyncThunk(`${name}/getVocabs`, async (_: void, { getState }) => {
  try {
    const state = getState() as RootState
    const { user } = state

    const { vocabs } = user

    const token = user.token || (await getUserToken())

    const loadVocab = async ({ _id, name }) => {
      let id = _id

      if (name === 'default') {
        id = name
      }

      return await getVocabById({ token, id })
    }

    const data = await Promise.all(vocabs.map(loadVocab))

    return data
  } catch (error) {
    throw error
  }
})

const getVocabsSlice = makeExtraReducers({
  action: getVocabs,
  extraReducers: {
    fulfilled: (
      state,
      {
        payload: {
          data: { token, translationHistory, vocabs, documents, glossaries, newUser },
        },
      },
    ) => {},
  },
})

const vocabsSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: {
    ...getVocabsSlice,
  },
})

export default vocabsSlice.reducer

export const {} = vocabsSlice.actions

export * as selectors from '../user/selectors'
