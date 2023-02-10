import debounce from 'lodash.debounce'
import { MIN_TRANSLATION_LENGTH } from '../constantes'

type Rect = {
  top: number
  left: number
  right: number
  bottom: number
  width: number
  height: number
}

export default class RangeRef {
  protected range: Range | null
  protected rect: Rect

  private update: EventListener

  constructor(checkNodeInTooltip: (node: HTMLElement) => boolean) {
    this.updateRect()

    this.update = debounce((evt) => {
      let selection = document.getSelection()
      let text = selection.toString()

      text = text.trim()

      if (evt.type === 'selectionchange' && evt?.target instanceof Document) {
        return
      }

      if (evt?.target && checkNodeInTooltip(evt.target)) {
        return
      }

      if (!text.length || text.length < MIN_TRANSLATION_LENGTH) {
        this.range = null
      } else {
        this.range = selection && selection.getRangeAt(0)
      }

      this.updateRect()
    }, 200)

    this.addListeners(this.update)
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

  addListeners(callback) {
    if (!callback) return

    document.addEventListener('mouseup', callback)
    document.addEventListener('keydown', callback)
    document.addEventListener('selectionchange', callback)
    window.addEventListener('scroll', callback)
    window.addEventListener('resize', callback)

    document.scrollingElement.addEventListener('scroll', callback)
  }

  removeListeners() {
    document.removeEventListener('mouseup', this.update)
    document.removeEventListener('keydown', this.update)
    document.removeEventListener('selectionchange', this.update)
    window.removeEventListener('scroll', this.update)
    window.removeEventListener('resize', this.update)

    document.scrollingElement.removeEventListener('scroll', this.update)
  }
}
