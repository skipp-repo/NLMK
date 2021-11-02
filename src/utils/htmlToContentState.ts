import { ContentState } from 'draft-js'
import { stateFromHTML } from 'draft-js-import-html'

export default (html): ContentState => {
  return stateFromHTML(html)
}
