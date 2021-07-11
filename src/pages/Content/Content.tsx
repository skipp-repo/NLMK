import { createPopper } from '@popperjs/core/lib/popper-lite.js'
import RangeRef from '../../utils/RangeRef'
import './content.styles.css'

const popperId = 'NLMK-Extension-Tooltip'

var fa = document.createElement('style')

fa.textContent = `
  @font-face {
    font-family: "Circe";
    src: url(${chrome.runtime.getURL('Circe.otf')}) format("opentype");
  }
`

document.head.appendChild(fa)

const getTooltip = (text) => {
  let tooltip = document.getElementById(popperId)

  if (tooltip) {
    tooltip.textContent = text
    return tooltip
  }

  tooltip = document.createElement('div')
  tooltip.className = popperId
  tooltip.id = popperId
  tooltip.textContent = text

  document.body.append(tooltip)

  return tooltip
}

const handleSelectionChange = (): void => {
  const selection: any = document.getSelection()

  const text = selection.toString()

  if (!selection.focusNode) return

  const tooltip = getTooltip(text)

  const rangeRef = new RangeRef()

  const popper = createPopper(rangeRef, tooltip, {
    placement: 'top',
  })

  rangeRef.rectChangedCallback = ({ width }) => {
    if (width > 0) {
      popper.update()
    } else {
    }
  }
}

// document.addEventListener('selectionchange', handleSelectionChange)
