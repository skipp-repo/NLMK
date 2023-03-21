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

  private bannedTags = ['CODE', 'INPUT', 'TEXTAREA', 'BUTTON']

  checkNodeInTooltip: (node: HTMLElement) => boolean

  constructor(checkNodeInTooltip: (node: HTMLElement) => boolean) {
    this.checkNodeInTooltip = checkNodeInTooltip

    this.addListeners(this.updateHandler)
  }

  preventUpdate = (evt) => {
    if (
      evt?.target instanceof Document ||
      this.bannedTags.includes(evt?.target?.tagName) ||
      (evt?.target?.closest && evt?.target?.closest('code')) ||
      (evt?.target && this.checkNodeInTooltip(evt.target))
    ) {
      return true
    }

    return false
  }

  updateHandler = (evt) => {
    let selection = document.getSelection()
    let text = selection.toString()
    text = text.trim()

    if (this.preventUpdate(evt)) {
      return
    }

    if (!text.length || text.length < MIN_TRANSLATION_LENGTH) {
      this.range = null
    } else {
      this.range = selection && selection.getRangeAt(0)
    }

    this.updateRect()

    this.rectChangedCallback(this.rect, text)
  }

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
    document.removeEventListener('mouseup', this.updateHandler)
    document.removeEventListener('keydown', this.updateHandler)
    document.removeEventListener('selectionchange', this.updateHandler)
    window.removeEventListener('scroll', this.updateHandler)
    window.removeEventListener('resize', this.updateHandler)

    document.scrollingElement.removeEventListener('scroll', this.updateHandler)
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
