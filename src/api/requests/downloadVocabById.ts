import axios from '../axios'
import fileDownload from 'js-file-download'

export type DownloadVocabById = {
  id: string
}

export const downloadVocabById = async ({ id }: DownloadVocabById) => {
  try {
    const { data, headers } = await axios.get(`/download/vocab/${id}`, {
      responseType: 'blob',
    })

    const blob = data
    const contentDisposHeader = headers['content-disposition']
    const match = contentDisposHeader.match(/filename="(.+)"/)

    let filename = !match ? 'unnamed.csv' : match[1]

    fileDownload(blob, filename)

    return { blob, filename }
  } catch (error) {
    console.error('Echo extension request error:', error)
  }
}
