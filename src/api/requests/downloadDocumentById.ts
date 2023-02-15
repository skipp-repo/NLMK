import axios from '../axios'
import fileDownload from 'js-file-download'

export type DownloadVocabById = {
  id: string
}

export const downloadDocumentById = async ({ id }: DownloadVocabById) => {
  try {
    const { data, headers } = await axios.get(`/download/documents/${id}`, {
      responseType: 'blob',
    })

    const contentDisposHeader = headers['content-disposition'] as string

    const match = contentDisposHeader.match(/filename="(.+)"/)

    let filename = !match ? 'unnamed.docx' : match[1]

    fileDownload(data, decodeURI(filename))

    return { blob: data, filename }
  } catch (error) {
    console.error('Echo extension request error:', error)
  }
}
