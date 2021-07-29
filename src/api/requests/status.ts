import createRequest from '../../utils/createRequest'

export type Status = {
  token?: string
}

export const status = async ({ token }: Status, init?: RequestInit) => {
  return await createRequest(`/user/status`, {
    headers: {
      'X-USER-ID': token,
    },
    ...init,
  })
}
