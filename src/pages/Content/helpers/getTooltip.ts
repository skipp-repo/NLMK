import BookmarkSvg from '../../../assets/icons/bookmark2.svg?raw'
import BookmarkSvgOutline from '../../../assets/icons/bookmark2-outline.svg?raw'

const popperId = 'NLMK-Extension-Tooltip'

const textClass = 'NLMK-Extension-Tooltip-text'

const createTooltipHTML = (text, active = true) => `
  <div id="${popperId}" class="${popperId}">
    <div class="${textClass}">
      ${text}
    </div>
    
    <div class="BookmarkButton NLMK-Extension-Tooltip-bookmark">
      ${active ? BookmarkSvgOutline : BookmarkSvg}
    </div>
  </div>
`

export const getTooltip = (text, active = true) => {
  let tooltip = document.getElementById(popperId)

  if (tooltip) {
    const textEl = tooltip.getElementsByClassName(textClass)[0]
    textEl.textContent = text

    tooltip.style.display = text?.length ? '' : 'none'

    return tooltip
  }

  document.body.insertAdjacentHTML('afterend', createTooltipHTML(text, active))

  return tooltip
}

export const clearTooltip = () => {
  getTooltip('')
}
