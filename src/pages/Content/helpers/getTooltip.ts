import BookmarkSvg from '../../../assets/icons/bookmark2.svg?raw'
import BookmarkSvgOutline from '../../../assets/icons/bookmark2-outline.svg?raw'
import { ICON_CLASS1, ICON_CLASS2, POPPER_ID, TOOLTIP_TEXT_CLASS } from '../constants'

const createTooltipHTML = (text, active = true) => `
  <div id="${POPPER_ID}" class="${POPPER_ID}" data-active="${active}">
    <div class="${TOOLTIP_TEXT_CLASS}">
      ${text}
    </div>
    
    <div class="${ICON_CLASS1} ${ICON_CLASS2}">
      ${active ? BookmarkSvg : BookmarkSvgOutline}
    </div>
  </div>
`

export const getTooltip = (text, active = true) => {
  let tooltip = document.getElementById(POPPER_ID)

  if (tooltip) {
    document.body.removeChild(tooltip)
  }

  document.body.insertAdjacentHTML('beforeend', createTooltipHTML(text, active))

  return document.getElementById(POPPER_ID)
}

export const clearTooltip = () => {
  getTooltip('')
}
