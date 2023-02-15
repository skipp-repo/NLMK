import fileDownload from 'js-file-download'
import axios from '../axios'

export type DownloadAllGlossaries = {
  docIds: number[]
}

export const downloadDocumentsByIds = async ({ docIds }: DownloadAllGlossaries) => {
  try {
    const params = {
      docIds,
    }
    const { data } = await axios.post('/download/documents', params)
    const streams = data._streams

    for (let i = 0; i <= streams.length - 3; i = i + 3) {
      const filename = streams[i].split('filename=')[1].split('"')[1]
      const binData = new Uint8Array(streams[i + 1].data)

      fileDownload(binData, filename)
    }
  } catch (error) {
    console.error('Echo extension request error:', error)
  }
}
