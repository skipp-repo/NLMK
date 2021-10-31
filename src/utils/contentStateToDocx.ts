import { ContentState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import { asBlob } from 'html-docx-js-typescript'

export default async (content: ContentState): Promise<Blob> => {
  const html = stateToHTML(content)
  return (await asBlob(html, { orientation: 'landscape', margins: { top: 100 } })) as Blob
}
