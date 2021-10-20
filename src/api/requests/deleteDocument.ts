import createRequest from '../../utils/createRequest'

export type RemoveDocument = {
  token: string
  id: number
}

export const removeDocument = async ({ token, id }: RemoveDocument, init?: RequestInit) => {
  return await createRequest(`/documents/${id}`, {
    method: 'DELETE',
    headers: {
      'X-USER-ID': token,
      'Content-Type': 'application/json',
    },
    ...init,
  })
}
