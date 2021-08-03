import createRequest from '../../utils/createRequest'

export type GetVocabs = {
  token: string
}

export const getVocabs = async ({ token }: GetVocabs, init?: RequestInit) => {
  return await createRequest(`/vocab`, {
    method: 'GET',
    headers: {
      'X-USER-ID': token,
      'Content-Type': 'application/json',
    },
    ...init,
  })
}
