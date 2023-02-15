import { nanoid } from 'nanoid'

const createUserToken = () => `${nanoid(20)}-${Date.now()}`

const getTokenFromStorage = (): Promise<string | null> =>
  new Promise((resolve, reject) => {
    chrome.storage.local.get('token', (data) => {
      if (data.token) {
        resolve(data.token)
      } else {
        resolve(null)
      }
    })
  })

const writeTokenToStorage = async (): Promise<string> => {
  return new Promise((resolve) => {
    const newToken = createUserToken()

    chrome.storage.local.set(
      {
        token: newToken,
      },
      () => {
        resolve(newToken)
      },
    )
  })
}

export default async (): Promise<string | null> => {
  const storageToken = await getTokenFromStorage()

  if (storageToken) {
    return storageToken
  } else {
    return await writeTokenToStorage()
  }
}
