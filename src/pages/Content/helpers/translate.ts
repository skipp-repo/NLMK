import { MAX_TRANSLATION_LENGTH, MIN_TRANSLATION_LENGTH } from '../../../constantes'
import { store } from '../../../redux/store'
import initUser from './initUser'
import { translation as translationRequest } from '../../../api/requests/translation'
import createTranslationString from '../../../utils/createTranslationString'
import flatten from 'arr-flatten'
import clickManager from '../clickManagerInstanse'
import Tooltip from './Tooltip'

let controller

export default async (event): Promise<void> => {
  const selection: any = document.getSelection()
  const text = selection.toString()

  console.log('event', event.target)

  if (controller) {
    controller.abort()
  }

  if (Tooltip.checkNodeInTooltip(clickManager.lastTarget)) {
    return
  }

  if (
    !text.length ||
    !selection.focusNode ||
    text.length > MAX_TRANSLATION_LENGTH ||
    text.length < MIN_TRANSLATION_LENGTH
  ) {
    Tooltip.destroy()

    console.log('destroy')

    return
  }

  const state = store.getState()

  let token = state?.user?.token || (await initUser())

  controller = new AbortController()

  const request = await translationRequest({ token, q: text }, { signal: controller.signal })

  if (!request) return

  const { status, error, data } = request

  if (status !== 200 || error || !data?.results?.length) return

  const results = flatten(data?.results)

  const translation = createTranslationString(results)

  Tooltip.init(translation, false)
}
