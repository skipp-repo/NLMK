import adapter from '../adapter'

export const { selectIds, selectEntities, selectAll, selectTotal, selectById } =
  adapter.getSelectors()
