import axios from '../axios'

export type DeleteAllDocuments = {
  docIds: number[]
}

export const deleteDocumentsByIds = async ({ docIds }: DeleteAllDocuments): Promise<any> => {
  return axios.delete(`/documents`, { data: { docIds } })
}
