import createRequest from '../../utils/createRequest'

export type GetVocabById = {
  token: string
  id: number
}

export const getGlossaryById = async ({ token, id }: GetVocabById, init?: RequestInit) => {
  return await createRequest(`/glossarycards/${id}`, {
    method: 'GET',
    headers: {
      'X-USER-ID': token,
      'Content-Type': 'application/json',
    },
    ...init,
  })
}
