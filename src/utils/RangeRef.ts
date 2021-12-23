import { MIN_TRANSLATION_LENGTH } from '../constantes'
import Tooltip from './Tooltip'

type Rect = {
  top: number
  left: number
  right: number
  bottom: number
  width: number
  height: number
}

export default class RangeRef {
  range: Range
  rect: {
    top: number
    left: number
    right: number
    bottom: number
    width: number
    height: number
  }

  constructor() {
    this.updateRect()

    const update: EventListener = (evt) => {
      let selection = document.getSelection()
      let text = selection.toString()

      text = text.trim()

      if (
        (evt?.target && Tooltip.checkNodeInTooltip(evt.target)) ||
        !text.length ||
        text.length < MIN_TRANSLATION_LENGTH
      ) {
        this.range = null
      } else {
        this.range = selection && selection.getRangeAt(0)
      }

      this.updateRect()
    }

    document.querySelector('*').addEventListener('mouseup', update)
    document.querySelector('*').addEventListener('keydown', update)

    document.addEventListener('selectionchange', update)

    //
    // document.scrollingElement.addEventListener('scroll', update)
    // window.addEventListener('scroll', update)
    //
    window.addEventListener('resize', update)
  }

  updateRect() {
    if (this.range) {
      this.rect = this.range.getBoundingClientRect()
    } else {
      this.rect = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: 0,
        height: 0,
      }
    }

    this.rectChangedCallback(this.rect)
  }

  rectChangedCallback(rect: Rect) {
    // Abstract to be implemented
  }

  getBoundingClientRect() {
    return this.rect
  }

  get clientWidth() {
    return this.rect.width
  }

  get clientHeight() {
    return this.rect.height
  }
}
