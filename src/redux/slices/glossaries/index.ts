import { createSlice } from '@reduxjs/toolkit'
import createAsyncThunkExtended from '../../helpers/createAsyncThunkExtended'
import makeExtraReducers from '../../helpers/makeExtraReducers'
import { getGlossaryById } from '../../../api/requests/getGlossaryById'
import type { HandlerAction } from '../../types'
import adapter from './adapter'
import { cardsIdsByGlossId } from './selectors'

const name = 'glossaries'

export type InitialState = {
  flags: {}
  selectedItems: number[]
}

const initialState: InitialState = {
  ...adapter.getInitialState(),
  flags: {},
  selectedItems: [],
}

export type GetVocab = {
  id: number
}

export const getGlossary = createAsyncThunkExtended(
  `${name}/getGlossary`,
  async ({ id }: GetVocab, { token }) => {
    return await getGlossaryById({ token, id })
  },
)

const getGlossarySlice = makeExtraReducers({
  action: getGlossary,
  extraReducers: {
    fulfilled: (state, { payload: { data } }) => {
      adapter.updateOne(state, { id: data.glossID, changes: { cards: data.cards } })
    },
  },
})

type SelectCardParams = HandlerAction<{
  cardId: number
  selected: boolean
}>

type SelectAllParams = HandlerAction<{
  glossaryId: number
  select: boolean
}>

type AddClossariesParams = HandlerAction<{
  glossaries: number
}>

const glossariesSlice = createSlice({
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
    selectAll: (state, { payload: { glossaryId, select } }: SelectAllParams) => {
      const cardIds = cardsIdsByGlossId(glossaryId)({ glossaries: state })

      state.selectedItems = select ? cardIds : []
    },
    addGlossaries: (state, { payload: { glossaries } }: AddClossariesParams) => {
      // @ts-ignore
      adapter.setAll(state, glossaries)
    },
  },
  extraReducers: {
    ...getGlossarySlice,
  },
})

export default glossariesSlice.reducer

export const { selectCard, selectAll, addGlossaries } = glossariesSlice.actions

export * as selectors from './selectors'
