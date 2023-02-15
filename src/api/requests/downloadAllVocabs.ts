import fileDownload from 'js-file-download'
import axios from '../axios'

export const downloadAllVocabs = async () => {
  try {
    const { data, headers } = await axios.get('/download/vocab/', {
      responseType: 'blob',
    })

    const contentDisposHeader = headers['content-disposition'] as string

    const match = contentDisposHeader.match(/filename="(.+)"/)

    let filename = !match ? 'unnamed.csv' : match[1]

    fileDownload(data, filename)

    return { blob: data, filename }
  } catch (error) {
    console.error('Echo extension request error:', error)
  }
}
