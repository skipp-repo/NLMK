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

    document.querySelector('*').addEventListener('mouseup', update)
    document.querySelector('*').addEventListener('input', update)
    document.querySelector('*').addEventListener('keydown', (evt) => update(evt))

    window.addEventListener('scroll', update)

    document.scrollingElement.addEventListener('scroll', update)
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
