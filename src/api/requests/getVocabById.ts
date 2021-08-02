import createRequest from '../../utils/createRequest'

export type GetVocabById = {
  token: string
  id: string
}

export const getVocabById = async ({ token, id }: GetVocabById, init?: RequestInit) => {
  return await createRequest(`/vocab/${id}`, {
    method: 'GET',
    headers: {
      'X-USER-ID': token,
      'Content-Type': 'application/json',
    },
    ...init,
  })
}
