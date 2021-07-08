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

      this.range = selection && selection.rangeCount && selection.getRangeAt(0)

      this.updateRect()
    }
    document.querySelector('[contenteditable]').addEventListener('mouseup', update)
    document.querySelector('[contenteditable]').addEventListener('input', update)
    document.querySelector('[contenteditable]').addEventListener('keydown', (evt) => update(evt))

    window.addEventListener('scroll', update)
    document.scrollingElement.addEventListener('scroll', update)
  }

  updateRect() {
    this.rect = this.range.getBoundingClientRect()

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
