import createRequest from '../../utils/createRequest'

export type DeleteAllDocuments = {
  token: string
  docIds: number[]
}

export const deleteDocumentsByIds = async (
  { token, docIds }: DeleteAllDocuments,
  init?: RequestInit,
) => {
  try {
    const params = {
      docIds,
    }

    return await createRequest(`/documents`, {
      method: 'DELETE',
      headers: {
        'X-USER-ID': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
      ...init,
    })
  } catch (error) {
    console.error('NLMK extension request error:', error)
  }
}
