import axios from '../axios'
import fileDownload from 'js-file-download'

export type DownloadVocabById = {
  cardIds: number[]
}

export const downloadVocabByIds = async ({ cardIds }: DownloadVocabById) => {
  try {
    const { data, headers } = await axios.post('/download/savedtranslations/', cardIds, {
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
