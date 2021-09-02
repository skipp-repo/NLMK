import createRequest from '../../utils/createRequest'

export type EditVocabFolder = {
  token: string
  id: number | 'default'
  name?: string
  cardsToAdd?: number[]
  cardsToRemove?: number[]
}

export const editVocabFolder = async (
  { token, id, name, cardsToAdd, cardsToRemove }: EditVocabFolder,
  init?: RequestInit,
) => {
  const params = {
    id,
    name,
    cardsToAdd: cardsToAdd || [],
    cardsToRemove: cardsToRemove || [],
  }

  return await createRequest(`/vocab/${id}`, {
    method: 'PUT',
    headers: {
      'X-USER-ID': token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
    ...init,
  })
}
