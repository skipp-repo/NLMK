import secrets from 'secrets'

const { API_URL } = secrets

export type UpdateDocument = {
  token: string
  id: string
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

    const headers = { 'X-USER-ID': token }

    if (documentHTML) {
      headers['Content-Type'] = 'application/json'
    }

    const result = await fetch(`${API_URL}/documents/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(params),
      ...init,
    })

    return await result.json()
  } catch (error) {
    console.error('Echo extension request error:', error)
  }
}
