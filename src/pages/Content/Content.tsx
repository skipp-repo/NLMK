import { createPopper } from '@popperjs/core/lib/popper-lite.js'
import RangeRef from '../../utils/RangeRef'

const popperId = 'nlmk-translation-popper'

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

  console.log('test', selection.focusNode)

  const tooltip = getTooltip(text)

  console.log('test2', tooltip, tooltip.getBoundingClientRect)

  createPopper(selection.focusNode, tooltip, {
    placement: 'top',
  })
}

// document.addEventListener('selectionchange', handleSelectionChange)
