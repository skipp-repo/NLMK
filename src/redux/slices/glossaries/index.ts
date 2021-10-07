import { createSlice } from '@reduxjs/toolkit'
import createAsyncThunkExtended from '../../helpers/createAsyncThunkExtended'
import makeExtraReducers from '../../helpers/makeExtraReducers'
import { getGlossaryById } from '../../../api/requests/getGlossaryById'
import adapter from './adapter'
import { cardsIdsByGlossId } from './selectors'

const name = 'glossaries'

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

const glossariesSlice = createSlice({
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
      const cardIds = cardsIdsByGlossId(glossaryId)({ glossaries: state })

      state.selectedItems[glossaryId] = select ? cardIds : []
    },
    addGlossaries: (state, { payload: { glossaries } }) => {
      adapter.addMany(state, glossaries)
    },
  },
  extraReducers: {
    ...getGlossarySlice,
  },
})

export default glossariesSlice.reducer

export const { selectCard, selectAll, addGlossaries } = glossariesSlice.actions

export * as selectors from './selectors'
