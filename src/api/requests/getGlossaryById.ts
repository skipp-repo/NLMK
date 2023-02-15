import axios from '../axios'

export type GetVocabById = {
  id: number
}

export const getGlossaryById = async ({ id }: GetVocabById) => {
  const { data } = await axios.get(`/glossarycards/${id}`)

  return data
}
