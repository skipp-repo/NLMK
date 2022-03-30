import secrets from 'secrets'

const { API_URL } = secrets

export type RenameDocument = {
  token: string
  newName: string
  id: string
}

export const renameDocument = async (
  { token, newName, id }: RenameDocument,
  init?: RequestInit,
) => {
  try {
    const body = JSON.stringify({
      newName,
    })

    const result = await fetch(`${API_URL}/documents/rename/${id}`, {
      method: 'PUT',
      headers: {
        'X-USER-ID': token,
        'Content-Type': 'application/json',
      },
      body,
      ...init,
    })

    return await result.json()
  } catch (error) {
    console.error('Echo extension request error:', error)
  }
}
