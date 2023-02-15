import { TranslationRequest } from '../../types'
import axios from '../axios'

export type Translation = TranslationRequest & {}

export const translation = async ({ q, remember, filters }: Translation): Promise<any> => {
  if (!q) return null

  const { data } = await axios.post(`/translation`, {
    q,
    filters,
    remember,
  })

  return data
}
