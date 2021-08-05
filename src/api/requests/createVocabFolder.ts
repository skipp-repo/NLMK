import createRequest from '../../utils/createRequest'

export type CreateVocabFolder = {
  token: string
  name: string
  cardsToAdd: number[]
}

export const createVocabFolder = async (
  { token, name, cardsToAdd }: CreateVocabFolder,
  init?: RequestInit,
) => {
  const params = {
    name,
    cardsToAdd: cardsToAdd || [],
  }

  return await createRequest(`/vocab`, {
    method: 'POST',
    headers: {
      'X-USER-ID': token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
    ...init,
  })
}
