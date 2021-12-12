import { MAX_TRANSLATION_LENGTH, MIN_TRANSLATION_LENGTH } from '../../../constantes'
import { clearTooltip, getTooltip } from './getTooltip'
import { store } from '../../../redux/store'
import initUser from './initUser'
import RangeRef from '../../../utils/RangeRef'
import { translation as translationRequest } from '../../../api/requests/translation'
import createTranslationString from '../../../utils/createTranslationString'
import { createPopper } from '@popperjs/core/lib/popper-lite'
import flatten from 'arr-flatten'

let controller

export default async (): Promise<void> => {
  const selection: any = document.getSelection()
  const text = selection.toString()

  if (controller) {
    controller.abort()
  }

  if (
    !text.length ||
    !selection.focusNode ||
    text.length > MAX_TRANSLATION_LENGTH ||
    text.length < MIN_TRANSLATION_LENGTH
  ) {
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
