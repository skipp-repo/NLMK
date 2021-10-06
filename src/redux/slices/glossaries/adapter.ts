import { createEntityAdapter } from '@reduxjs/toolkit'
export { Vocab } from '../../../types'

// @ts-ignore
const adapter = createEntityAdapter<any>({
  selectId: (item) => item.glossID,
})

export default adapter
