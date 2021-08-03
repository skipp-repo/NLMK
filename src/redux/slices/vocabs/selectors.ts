import adapter from './adapter'

export const vocabs = (state) => state.vocabs

export const { selectIds, selectEntities, selectAll, selectTotal, selectById } =
  adapter.getSelectors()
