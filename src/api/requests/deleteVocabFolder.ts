import axios from '../axios'

export type RemoveVocabFolder = {
  id: number
}

export const removeVocabFolder = async ({ id }: RemoveVocabFolder, init?: RequestInit) => {
  return await axios.delete(`/vocab/${id}`)
}
