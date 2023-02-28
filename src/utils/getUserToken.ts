import { nanoid } from 'nanoid'
import storage from '../storage'

const tokenKey = 'echo:token'

const createUserToken = () => `${nanoid(20)}-${Date.now()}`

const getTokenFromStorage = (): Promise<string | null> =>
  new Promise(async (resolve, reject) => {
    const token = await storage.getItem(tokenKey)

    if (token) {
      resolve(token)
    } else {
      resolve(null)
    }
  })

const writeTokenToStorage = async (): Promise<string> => {
  const newToken = createUserToken()

  await storage.setItem(tokenKey, newToken)

  return newToken
}

const getUserToken = async (): Promise<string | null> => {
  const storageToken = await getTokenFromStorage()

  if (storageToken) {
    return storageToken
  } else {
    return await writeTokenToStorage()
  }
}

export default getUserToken
