import { createEntityAdapter } from '@reduxjs/toolkit'
export { Vocab } from '../../../types'

// @ts-ignore
const adapter = createEntityAdapter<Vocab>({
  selectId: (item) => item._id,
  sortComparer: (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt),
})

export default adapter
