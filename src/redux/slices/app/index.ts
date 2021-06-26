import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  key: 'value',
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
})

export default appSlice.reducer
