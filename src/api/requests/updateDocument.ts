import secrets from 'secrets'

const { API_URL } = secrets

export type UpdateDocument = {
  token: string
  id: number
  documentHTML: string
  documentName?: string
}

export const updateDocument = async (
  { token, id, documentHTML, documentName }: UpdateDocument,
  init?: RequestInit,
) => {
  try {
    const params = {
      id,
      documentHTML,
      documentName,
    }

    const result = await fetch(`${API_URL}/documents/${id}`, {
      method: 'PUT',
      headers: {
        'X-USER-ID': token,
      },
      body: JSON.stringify(params),
      ...init,
    })

    return await result.json()
  } catch (error) {
    console.error('NLMK extension request error:', error)
  }
}
