import './content.styles.css'
import addStyles from './helpers/addStyles'
import translate from './helpers/translate'

addStyles()

document.addEventListener('selectionchange', translate)
