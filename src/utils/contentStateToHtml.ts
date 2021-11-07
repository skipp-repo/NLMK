import { ContentState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'

export default (content: ContentState): string => {
  const html = stateToHTML(content)

  const fullHtml = `<!DOCTYPE <html><head></head></html><html><body>${html}</body></html>`

  return fullHtml
}
