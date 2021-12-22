import './content.styles.css'
import addStyles from './helpers/addStyles'
import translate from './helpers/translate'
import BookmarkSvg from '../../assets/icons/bookmark2.svg?raw'
import BookmarkSvgOutline from '../../assets/icons/bookmark2-outline.svg?raw'
import { ICON_CLASS1, POPPER_ID } from './constants'

addStyles()

document.addEventListener('selectionchange', translate)

document.addEventListener('click', (e) => {
  // @ts-ignore
  const bookmarkButton = e.target?.closest(`.${ICON_CLASS1}`)

  if (bookmarkButton) {
    const tooltip = document.getElementById(POPPER_ID)
    const active = tooltip.dataset.active

    const svg = bookmarkButton.getElementsByTagName('svg')[0]

    bookmarkButton.removeChild(svg)
    bookmarkButton.insertAdjacentHTML('afterbegin', active ? BookmarkSvg : BookmarkSvgOutline)
  } else {
    // clearTooltip()
  }
})
