import axios from '../axios'

export type GetVocabs = {}

export const getVocabs = async () => {
  const { data } = await axios.get(`/vocab`)

  return data
}
