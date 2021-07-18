import { createPopper } from '@popperjs/core/lib/popper-lite.js'
import RangeRef from '../../utils/RangeRef'
import { translation as translationRequest } from '../../api/requests/translation'
import { store } from '../../redux/store'
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

const clearTooltip = () => {
  getTooltip('')
}

let controller

const handleSelectionChange = async (): Promise<void> => {
  const selection: any = document.getSelection()
  const text = selection.toString()

  if (controller) {
    controller.abort()
  }

  if (!text.length || !selection.focusNode) {
    clearTooltip()
    return
  }

  const state = store.getState()

  if (!state?.user?.token) return

  const {
    user: { token },
  } = state

  const rangeRef = new RangeRef()

  controller = new AbortController()

  const request = await translationRequest({ token, q: text }, { signal: controller.signal })

  if (!request) return

  const { status, error, data } = request

  if (status !== 200 || error || !data?.results?.length) return

  const { translation } = data?.results[0]

  const tooltip = getTooltip(translation)

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

document.addEventListener('selectionchange', handleSelectionChange)
