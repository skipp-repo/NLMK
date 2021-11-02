import { ContentState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'

export default async (content: ContentState): Promise<Blob> => {
  return stateToHTML(content)
}
