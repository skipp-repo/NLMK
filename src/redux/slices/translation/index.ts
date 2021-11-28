import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { translation as translationRequest } from '../../../api/requests/translation'
import { TranslationRequest, TranslationResult } from '../../../types'
import getUserToken from '../../../utils/getUserToken'
import { RootState } from '../../types'
import makeExtraReducers from '../../helpers/makeExtraReducers'
import { updateTranslationHistory } from '../user'

const name = 'translation'

export type InitialState = {
  flags: {}
}

const initialState: InitialState = {
  flags: {},
}

export enum SpaceEnum {
  Popup = 'Popup',
  MainVocabs = 'MainVocabs',
  Glossaries = 'Glossaries',
  Documents = 'Documents',
  DocumentsVocabs = 'DocumentsVocabs',
  DocumentsGlossaries = 'DocumentsGlossaries',
  DocumentsPopup = 'DocumentsPopup',
}

const defaultSpace: SpaceEnum = SpaceEnum.Popup

export type Translate = Omit<TranslationRequest, 'q'> & {
  query: string
  space?: SpaceEnum
}

export const translate = createAsyncThunk(
  `${name}/translate`,
  async (
    { query, filters, space, remember }: Translate,
    { getState, dispatch },
  ): Promise<TranslationResult> => {
    try {
      const state = getState() as RootState
      const { user, translation } = state

      const token = user.token || (await getUserToken())

      dispatch(updateTranslationHistory(translation.Popup))

      return await translationRequest({
        token,
        q: query,
        filters,
        remember,
      })
    } catch (error) {
      throw error
    }
  },
)

const translateSlice = makeExtraReducers({
  action: translate,
  extraReducers: {
    fulfilled: (
      state,
      {
        meta: {
          arg: { space },
        },
        payload: {
          data: { searchPhrase, orthographicCorrections, results },
        },
      },
    ) => {
      state[space || defaultSpace] = {
        searchPhrase,
        orthographicCorrections,
        results,
      }
    },
  },
})

const translationSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: {
    ...translateSlice,
  },
})

export default translationSlice.reducer

export * as selectors from './selectors'
