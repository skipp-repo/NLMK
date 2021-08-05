import createRequest from '../../utils/createRequest'

export type RemoveVocabFolder = {
  token: string
  id: number
}

export const removeVocabFolder = async ({ token, id }: RemoveVocabFolder, init?: RequestInit) => {
  return await createRequest(`/vocab/${id}`, {
    method: 'DELETE',
    headers: {
      'X-USER-ID': token,
      'Content-Type': 'application/json',
    },
    ...init,
  })
}
