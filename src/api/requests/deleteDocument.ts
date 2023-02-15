import axios from '../axios'

export type RemoveDocument = {
  id: number
}

export const deleteDocument = async ({ id }: RemoveDocument): Promise<any> => {
  const { data } = await axios.delete(`/documents/${id}`)
  return data
}
