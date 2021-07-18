import secrets from 'secrets'

const { API_URL } = secrets

export default async (url: string, init?: RequestInit) => {
  try {
    const data = await fetch(`${API_URL}${url}`, init)
    return await data.json()
  } catch (error) {
    if (error.name === 'AbortError') {
      console.warn(`NLMK: api request ${url} aborted`)
      return
    }

    console.error('NLMK extension request error:', error)
  }
}
