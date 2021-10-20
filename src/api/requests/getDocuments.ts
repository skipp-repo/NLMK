import createRequest from '../../utils/createRequest'

export type GetDocuments = {
  token: string
}

export const getDocuments = async ({ token }: GetDocuments, init?: RequestInit) => {
  return await createRequest(`/documents`, {
    method: 'GET',
    headers: {
      'X-USER-ID': token,
      'Content-Type': 'application/json',
    },
    ...init,
  })
}
