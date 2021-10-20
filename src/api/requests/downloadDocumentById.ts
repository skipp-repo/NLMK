import fileDownload from 'js-file-download'
import secrets from 'secrets'

const { API_URL } = secrets

export type DownloadVocabById = {
  token: string
  id: string
}

export const downloadDocumentById = async (
  { token, id }: DownloadVocabById,
  init?: RequestInit,
) => {
  try {
    const result = await fetch(`${API_URL}/download/documents/${id}`, {
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

    let filename = !match ? 'unnamed.docx' : match[1]

    fileDownload(blob, decodeURI(filename))

    return { blob, filename }
  } catch (error) {
    console.error('NLMK extension request error:', error)
  }
}
