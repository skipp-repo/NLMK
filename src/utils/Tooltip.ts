import {
  ICON_CLASS1,
  ICON_CLASS2,
  POPPER_ID,
  POPPER_ROOT_ID, TOOLTIP_ERROR_TEXT_CLASS,
  TOOLTIP_ROOT_CLASS,
  TOOLTIP_TEXT_CLASS,
} from '../pages/Content/constants'
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
  tooltipText = ''
  errorText = null
  tooltipBookmarked = false
  bookmarkButtonHidden = false

  constructor() {
    this.init()

    this.rangeRef.rectChangedCallback = ({ width }) => {
      this.popper?.update()
    }

    document.addEventListener('click', (e) => {
      if (Tooltip.checkNodeIsBookmark(e.target)) {
        this.updateBookmarkedState()

        this.onBookmarkled(this.tooltipBookmarked)
      }
    })
  }

  private createTooltipRoot() {
    const el = document.createElement('div')

    el.classList.add(TOOLTIP_ROOT_CLASS)
    el.id = POPPER_ROOT_ID

    this.tooltip = el
  }

  private createTooltipHTML() {
    const errorTextHtml = this.errorText ? `<div class="${TOOLTIP_ERROR_TEXT_CLASS}">${this.errorText}</div>` : ''

    return `
  <div id="${POPPER_ID}" class="${POPPER_ID}" data-active="${this.tooltipBookmarked}">
    ${errorTextHtml}
    <div class="${TOOLTIP_TEXT_CLASS}">${this.tooltipText}</div>
    <div class="${ICON_CLASS1} ${ICON_CLASS2}">
      ${
        !this.bookmarkButtonHidden
          ? this.tooltipBookmarked
            ? BookmarkSvg
            : BookmarkSvgOutline
          : ''
      }
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

  private insertTooltip() {
    this.removeTooltip()

    this.createTooltipRoot()

    this.tooltip.insertAdjacentHTML('beforeend', this.createTooltipHTML())

    document.body.append(this.tooltip)

    this.tooltip = document.getElementById(POPPER_ROOT_ID)
  }

  private updateTooltip() {
    const tooltipContent = document.getElementById(POPPER_ID)

    tooltipContent.remove()

    this.tooltip.insertAdjacentHTML('beforeend', this.createTooltipHTML())

    this.popper?.update()
  }

  private initPopper() {
    this.popper = createPopper(this.rangeRef, this.tooltip, {
      placement: 'top',
      modifiers: [
        hide,
        // @ts-ignore
        sameWidth,
        {
          name: 'eventListeners',
          options: { scroll: false },
        },
      ],
    })
  }

  public setLoading = () => {
    if (!this.tooltip) return

    this.tooltipText = 'загрузка...'
    this.tooltipBookmarked = false
    this.bookmarkButtonHidden = true
    this.errorText = null
    this.updateTooltip()
  }

  public checkNodeInTooltip(node) {
    if (!node || !node.closest) return false
    return node.closest(`.${POPPER_ROOT_ID}`)
  }

  private static checkNodeIsBookmark(node) {
    if (!node || !node.closest) return false

    return node.closest(`.${ICON_CLASS1}`)
  }

  private init() {
    this.insertTooltip()
    this.initPopper()
  }

  public update(text, tooltipBookmarked) {
    this.errorText = null
    this.tooltipText = text
    this.tooltipBookmarked = tooltipBookmarked
    this.bookmarkButtonHidden = false

    if (!this.tooltip) {
      this.init()
      return
    }

    this.updateTooltip()
  }


  public showError(text) {
    this.errorText = text

    this.tooltipText = ''
    this.bookmarkButtonHidden = true

    this.updateTooltip()
  }


  private updateBookmarkedState = () => {
    this.tooltipBookmarked = !this.tooltipBookmarked

    this.updateTooltip()
  }

  public destroy() {
    this.popper?.destroy()
    this.removeTooltip()
  }

  public onBookmarkled = (active) => {}
}

export default new Tooltip()
