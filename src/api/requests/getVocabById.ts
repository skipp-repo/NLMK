import axios from '../axios'

export type GetVocabById = {
  id: number
}

export const getVocabById = async ({ id }: GetVocabById) => {
  const { data } = await axios.get(`/vocab/${id}`)

  return data
}
