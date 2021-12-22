import { ICON_CLASS1, ICON_CLASS2, POPPER_ID, TOOLTIP_TEXT_CLASS } from '../pages/Content/constants'
import BookmarkSvg from '../assets/icons/bookmark2.svg?raw'
import BookmarkSvgOutline from '../assets/icons/bookmark2-outline.svg?raw'
import { createPopper } from '@popperjs/core/lib/popper-lite'
import { hide } from '@popperjs/core'
import RangeRef from './RangeRef'
import { Instance } from '@popperjs/core/lib/types'
import sameWidth from '../pages/Content/helpers/sameWidth'

class Tooltip {
  text = ''
  active = false
  rangeRef = new RangeRef()
  tooltip = null
  popper: Instance | null = null

  private static createTooltipHTML(text, active = true) {
    return `
  <div id="${POPPER_ID}" class="${POPPER_ID}" data-active="${active}">
    <div class="${TOOLTIP_TEXT_CLASS}">${text}</div>
    <div class="${ICON_CLASS1} ${ICON_CLASS2}">
      ${active ? BookmarkSvg : BookmarkSvgOutline}
    </div>
  </div>
`
  }

  private removeTooltip() {
    if (this.tooltip) {
      document.body.removeChild(this.tooltip)
      this.tooltip = null
    }
  }

  private insertTooltip(text, active = true) {
    this.removeTooltip()

    document.body.insertAdjacentHTML('beforeend', Tooltip.createTooltipHTML(text, active))

    this.tooltip = document.getElementById(POPPER_ID)

    return this.tooltip
  }

  private initPopper() {
    this.popper = createPopper(this.rangeRef, this.tooltip, {
      placement: 'top',
      // @ts-ignore
      modifiers: [hide, sameWidth],
    })
  }

  private clearTooltip = () => {
    const textEls = document.getElementsByClassName(TOOLTIP_TEXT_CLASS)

    if (!textEls.length) return

    const textEl = textEls[0]

    textEl.textContent = ''
  }

  public checkNodeInTooltip(node) {
    if (!node) return false

    return node?.closest(`.${POPPER_ID}`)
  }

  public init(text, active) {
    this.insertTooltip(text, active)
    this.initPopper()
  }

  public destroy() {
    this.popper?.destroy()
    this.removeTooltip()
  }
}

export default new Tooltip()
