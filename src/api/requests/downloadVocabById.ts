import fileDownload from 'js-file-download'
import secrets from 'secrets'

const { API_URL } = secrets

export type DownloadVocabById = {
  token: string
  id: string
}

export const downloadVocabById = async ({ token, id }: DownloadVocabById, init?: RequestInit) => {
  try {
    const result = await fetch(`${API_URL}/download/vocab/${id}`, {
      method: 'GET',
      headers: {
        'X-USER-ID': token,
        'Content-Type': 'application/json',
        responseType: 'blob',
      },
      ...init,
    })

    const blob = await result.blob()

    const contentDisposHeader = result.headers.get('Content-Disposition') as string

    const match = contentDisposHeader.match(/filename="(.+)"/)

    let filename = !match ? 'unnamed.csv' : match[1]

    fileDownload(blob, filename)

    return { blob, filename }
  } catch (error) {
    console.error('Echo extension request error:', error)
  }
}
