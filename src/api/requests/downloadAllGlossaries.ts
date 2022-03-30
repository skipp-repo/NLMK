import fileDownload from 'js-file-download'
import secrets from 'secrets'

const { API_URL } = secrets

export type DownloadAllGlossaries = {
  token: string
  glossaryIds: number[]
}

export const downloadAllGlossarys = async (
  { token, glossaryIds }: DownloadAllGlossaries,
  init?: RequestInit,
) => {
  try {
    const params = {
      glossaryIds,
    }

    const result = await fetch(`${API_URL}/download/glossary/`, {
      method: 'POST',
      headers: {
        'X-USER-ID': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
      ...init,
    })

    const json = await result.json()
    const streams = json._streams

    for (let i = 0; i <= streams.length - 3; i = i + 3) {
      const filename = streams[i].split('filename=')[1].split('"')[1]
      const binData = new Uint8Array(streams[i + 1].data)

      fileDownload(binData, filename)
    }
  } catch (error) {
    console.error('Echo extension request error:', error)
  }
}
