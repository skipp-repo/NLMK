import secrets from 'secrets'

const { API_URL } = secrets

export type UploadDocument = {
  token: string
  data?: FormData
  documentHTML?: string
  documentName?: string
}

export const uploadDocument = async (
  { token, data, documentHTML, documentName }: UploadDocument,
  init?: RequestInit,
) => {
  try {
    const headers = { 'X-USER-ID': token }

    if (documentHTML) {
      headers['Content-Type'] = 'application/json'
    }

    const result = await fetch(`${API_URL}/documents/`, {
      method: 'POST',
      headers,
      body:
        data ||
        JSON.stringify({
          documentHTML,
          documentName,
        }),
      ...init,
    })

    return await result.json()
  } catch (error) {
    console.error('Echo extension request error:', error)
  }
}
