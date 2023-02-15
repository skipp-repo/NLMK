import axios from '../axios'

export const status = async () => {
  const { data } = await axios.get(`/user/status`)

  return data
}
