import fileDownload from 'js-file-download'
import secrets from 'secrets'

const { API_URL } = secrets

export type DownloadAllVocabs = {
  token: string
}

export const downloadAllVocabs = async ({ token }: DownloadAllVocabs, init?: RequestInit) => {
  try {
    const result = await fetch(`${API_URL}/download/vocab/`, {
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
