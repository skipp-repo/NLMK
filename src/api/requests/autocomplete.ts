import axios from '../axios'

export type Autocomplete = {
  q: string
}

export const autocomplete = async ({ q }: Autocomplete): Promise<any> => {
  const { data } = await axios.post(`/autocompletion`, {
    q,
  })

  return data
}
