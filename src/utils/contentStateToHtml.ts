import { ContentState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'

export default (content: ContentState): string => {
  const html = stateToHTML(content)

  return `<!DOCTYPE html><html lang='ru'><head><title></title></head><body>${html}</body></html>`
}
