import createRequest from '../../utils/createRequest'

export type Autocomplete = {
  token: string
  q: string
}

export const autocomplete = async ({ token, q }: Autocomplete, init?: RequestInit) => {
  const params = {
    q,
  }

  return await createRequest(`/autocompletion`, {
    method: 'POST',
    headers: {
      'X-USER-ID': token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
    ...init,
  })
}
