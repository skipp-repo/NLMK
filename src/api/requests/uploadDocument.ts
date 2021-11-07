import secrets from 'secrets'

const { API_URL } = secrets

export type UploadDocument = {
  token: string
  data?: FormData
  documentHTML?: string
  docName?: string
}

export const uploadDocument = async (
  { token, data, documentHTML, docName }: UploadDocument,
  init?: RequestInit,
) => {
  try {
    const result = await fetch(`${API_URL}/documents/`, {
      method: 'POST',
      headers: {
        'X-USER-ID': token,
      },
      body:
        data ||
        JSON.stringify({
          documentHTML,
          docName,
        }),
      ...init,
    })

    return await result.json()
  } catch (error) {
    console.error('NLMK extension request error:', error)
  }
}
