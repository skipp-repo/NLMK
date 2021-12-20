import { POPPER_ID } from '../constants'

export default class Tooltip {
  static checkNodeInTooltip(node) {
    if (!node) return false

    return node?.closest(`.${POPPER_ID}`)
  }
}
