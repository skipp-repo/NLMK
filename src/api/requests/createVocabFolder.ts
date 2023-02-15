import axios from '../axios'

export type CreateVocabFolder = {
  name: string
  cardsToAdd: number[]
}

export const createVocabFolder = async ({ name, cardsToAdd }: CreateVocabFolder): Promise<any> => {
  const { data } = await axios.post(`/vocab`, {
    name,
    cardsToAdd: cardsToAdd || [],
  })

  return data
}
