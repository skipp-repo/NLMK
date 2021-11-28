import createRequest from '../../utils/createRequest'

export type GetDocumentById = {
  token: string
  id: string
}

export const getDocumentById = async ({ token, id }: GetDocumentById, init?: RequestInit) => {
  return await createRequest(`/documents/${id}`, {
    method: 'GET',
    headers: {
      'X-USER-ID': token,
      'Content-Type': 'application/json',
    },
    ...init,
  })
}
