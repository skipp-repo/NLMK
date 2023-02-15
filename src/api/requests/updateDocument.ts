import axios from '../axios'

export type UpdateDocument = {
  id: string
  documentHTML: string
  documentName?: string
}

export const updateDocument = async ({ id, documentHTML, documentName }: UpdateDocument) => {
  try {
    const headers = {}

    if (documentHTML) {
      headers['Content-Type'] = 'application/json'
    } else {
      headers['Content-Type'] = undefined
    }

    const response = await axios.put(
      `/documents/${id}`,
      {
        id,
        documentHTML,
        documentName,
      },
      { headers },
    )
    const { data } = response

    return data
  } catch (error) {
    console.error('Echo extension request error:', error)
  }
}
