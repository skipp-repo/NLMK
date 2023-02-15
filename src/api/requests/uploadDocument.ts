import axios from '../axios'

export type UploadDocument = {
  data?: FormData
  documentHTML?: string
  documentName?: string
}

export const uploadDocument = async ({ data, documentHTML, documentName }: UploadDocument) => {
  try {
    const headers = {}

    if (documentHTML) {
      headers['Content-Type'] = 'application/json'
    } else {
      headers['Content-Type'] = undefined
    }

    const response = await axios.post(
      `/documents/`,
      data || {
        documentHTML,
        documentName,
      },
      {
        headers,
      },
    )

    return response.data
  } catch (error) {
    console.error('Echo extension request error:', error)
  }
}
