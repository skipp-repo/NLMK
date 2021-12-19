export default class ClickManager {
  public lastTarget = null

  constructor() {
    this.init()
  }

  handler = (e) => {
    this.lastTarget = e.target
  }

  init() {
    document.addEventListener('click', this.handler)
  }

  destroy() {
    document.removeEventListener('click', this.handler)
  }

  getLastTarget() {
    console.log(this.lastTarget)
    return this.lastTarget
  }
}
