import axios from '../axios'

export type EditVocabFolder = {
  id: number | 'default'
  name?: string
  cardsToAdd?: number[]
  cardsToRemove?: number[]
}

export const editVocabFolder = async ({ id, name, cardsToAdd, cardsToRemove }: EditVocabFolder) => {
  const { data } = await axios.put(`/vocab/${id}`, {
    id,
    name,
    cardsToAdd: cardsToAdd || [],
    cardsToRemove: cardsToRemove || [],
  })

  return data
}
