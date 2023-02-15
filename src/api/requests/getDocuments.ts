import axios from '../axios'

export type GetDocuments = {}

export const getDocuments = async () => {
  const { data } = await axios.get('/documents')

  return data
}
