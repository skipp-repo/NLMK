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

export default class VirtualElement {
  protected range: Range | null
  protected rect: Rect | null = null

  checkNodeInTooltip: (node: HTMLElement) => boolean

  constructor(checkNodeInTooltip: (node: HTMLElement) => boolean) {
    this.checkNodeInTooltip = checkNodeInTooltip

    this.addListeners(this.update)
  }

  update = debounce((evt) => {
    let selection = document.getSelection()
    let text = selection.toString()

    text = text.trim()

    if (evt.type === 'selectionchange' && evt?.target instanceof Document) {
      return
    }

    if (evt?.target && this.checkNodeInTooltip(evt.target)) {
      return
    }

    if (!text.length || text.length < MIN_TRANSLATION_LENGTH) {
      this.range = null
    } else {
      this.range = selection && selection.getRangeAt(0)
    }

    this.updateRect()

    this.rectChangedCallback(this.rect, text)
  }, 200)

  updateRect() {
    if (this.range) {
      this.rect = this.range.getBoundingClientRect()
    } else {
      this.rect = null
    }
  }

  rectChangedCallback(rect: Rect, text: string) {
    // Abstract to be implemented
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

  destroy() {
    this.removeListeners()
  }

  // Methods for using in Popper js

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
