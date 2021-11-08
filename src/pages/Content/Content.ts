import { createPopper } from '@popperjs/core/lib/popper-lite.js'
import { getStatus } from '../../redux/slices/user'
import RangeRef from '../../utils/RangeRef'
import flatten from 'arr-flatten'
import { translation as translationRequest } from '../../api/requests/translation'
import { store } from '../../redux/store'
import './content.styles.css'
import { getTooltip, clearTooltip } from './helpers/getTooltip'
import createTranslationString from '../../utils/createTranslationString'

var fa = document.createElement('style')

fa.textContent = `
  @font-face {
    font-family: "Circe";
    src: url(${chrome.runtime.getURL('Circe.otf')}) format("opentype");
  }
`

document.head.appendChild(fa)

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

  let token = state?.user?.token || (await initUser())

  const rangeRef = new RangeRef()

  controller = new AbortController()

  const request = await translationRequest({ token, q: text }, { signal: controller.signal })

  if (!request) return

  const { status, error, data } = request

  if (status !== 200 || error || !data?.results?.length) return

  const results = flatten(data?.results)

  const translation = createTranslationString(results)

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

const initUser = async (): Promise<string> => {
  const state = store.getState()

  let token = state?.user?.token

  if (!token) {
    const { payload } = await store.dispatch(getStatus())

    const { status, data } = payload

    if (status === 200) {
      return data.token
    }
  }

  return token
}

document.addEventListener('selectionchange', handleSelectionChange)

initUser()
