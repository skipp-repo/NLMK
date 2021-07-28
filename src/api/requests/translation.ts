import createRequest from '../../utils/createRequest'
import { TranslationRequest } from '../../types'

export type Translation = TranslationRequest & {
  token: string
}

export const translation = async (
  { token, q, remember, filters }: Translation,
  init?: RequestInit,
) => {
  const params: TranslationRequest = {
    q,
    filters,
    remember,
  }

  return await createRequest(`/translation`, {
    method: 'POST',
    headers: {
      'X-USER-ID': token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
    ...init,
  })
}
