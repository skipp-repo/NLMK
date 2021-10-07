import fileDownload from 'js-file-download'
import secrets from 'secrets'

const { API_URL } = secrets

export type DownloadVocabById = {
  token: string
  cardIds: number[]
}

export const downloadVocabByIds = async (
  { token, cardIds }: DownloadVocabById,
  init?: RequestInit,
) => {
  try {
    const params = {
      cardIds,
    }

    const result = await fetch(`${API_URL}/download/savedtranslations/`, {
      method: 'POST',
      headers: {
        'X-USER-ID': token,
        'Content-Type': 'application/json',
        responseType: 'blob',
      },
      body: JSON.stringify(params),
      ...init,
    })

    const blob = await result.blob()

    const contentDisposHeader = result.headers.get('Content-Disposition') as string

    const match = contentDisposHeader.match(/filename="(.+)"/)

    let filename = !match ? 'unnamed.csv' : match[1]

    fileDownload(blob, filename)

    return { blob, filename }
  } catch (error) {
    console.error('NLMK extension request error:', error)
  }
}
