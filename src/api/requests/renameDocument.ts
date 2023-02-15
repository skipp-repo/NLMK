import axios from '../axios'

export type RenameDocument = {
  newName: string
  id: string
}

export const renameDocument = async ({ newName, id }: RenameDocument) => {
  const { data } = await axios.put(`/documents/rename/${id}`, {
    newName,
  })

  return data
}
