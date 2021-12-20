export default class ClickManager {
  public lastTarget = null

  constructor() {
    this.init()
  }

  handler = (e: MouseEvent) => {
    e.stopPropagation()
    this.lastTarget = e.target
  }

  init() {
    document.addEventListener('click', this.handler)
  }

  destroy() {
    document.removeEventListener('click', this.handler)
  }
}
