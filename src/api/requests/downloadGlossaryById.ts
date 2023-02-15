import axios from '../axios'
import fileDownload from 'js-file-download'

export type DownloadGlossaryById = {
  id: string
}

export const downloadGlossaryById = async ({ id }: DownloadGlossaryById) => {
  try {
    const { data, headers } = await axios.get(`/download/glossary/${id}`, {
      responseType: 'blob',
    })

    const contentDisposHeader = headers['content-disposition']
    const match = contentDisposHeader.match(/filename="(.+)"/)
    let filename = !match ? 'unnamed.csv' : match[1]

    fileDownload(data, decodeURI(filename))

    return { blob: data, filename }
  } catch (error) {
    console.error('Echo / Error downloading glossary:', error)
  }
}
