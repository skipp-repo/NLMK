import axios from '../axios'

export type GetDocumentById = {
  id: string
}

export const getDocumentById = async ({ id }: GetDocumentById) => {
  const { data } = await axios.get(`/documents/${id}`)
  return data
}
