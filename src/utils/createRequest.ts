import secrets from 'secrets'

const { API_URL } = secrets

export default async (url: string, init?: RequestInit) => {
  const data = await fetch(`${API_URL}${url}`, init)
  return await data.json()
}
