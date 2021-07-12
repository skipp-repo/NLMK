import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import dotenv from 'dotenv'

const config = dotenv.config()

console.log(config)
const name = 'user'

const initialState = {
  key: 'value',
}

export type GetStatus = {}

export const getStatus = createAsyncThunk(
  `${name}/getStatus`,
  async ({}: GetStatus, { getState }) => {
    try {
      const state = getState()

      console.log('test', state)
    } catch (error) {
      throw error
    }
  },
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
})

export default usersSlice.reducer
