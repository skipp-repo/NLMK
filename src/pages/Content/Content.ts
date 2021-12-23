import './content.styles.css'
import Tooltip from '../../utils/Tooltip'
import addStyles from './helpers/addStyles'
import translate from './helpers/translate'

addStyles()

document.addEventListener('selectionchange', translate)

Tooltip.onBookmarkled = (active) => {
  console.log('bookmark', active)
}
