import { store } from '../../../redux/store'
import { getStatus } from '../../../redux/slices/user'

export default async (): Promise<string | null> => {
  const state = store.getState()

  let token = state?.user?.token

  if (!token) {
    const { payload } = await store.dispatch(getStatus())

    if (!payload) return null

    const { status, data } = payload

    if (status === 200) {
      return data.token
    }
  }

  return token
}
