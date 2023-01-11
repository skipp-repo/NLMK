import secrets from 'secrets'

const { API_URL } = secrets

export default async (url: string, init?: RequestInit) => {
  return await fetch(`${API_URL}${url}`, init)
   .then(response => response.json())
   .catch(error => {
     if (error.name === 'AbortError') {
       console.warn(`Echo: api request ${url} aborted`)
       return
     }

     console.error('Echo extension request error:', error)
   })
}
