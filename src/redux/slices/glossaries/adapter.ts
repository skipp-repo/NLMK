import { createEntityAdapter } from '@reduxjs/toolkit'
export { Vocab } from '../../../types'

// @ts-ignore
const adapter = createEntityAdapter<any>({
  selectId: (item) => item._id,
})

export default adapter
