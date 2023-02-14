import { useDebouncedCallback } from 'use-debounce'
import * as translationSlice from '../redux/slices/translation'
import useReduxAction from './useReduxAction'
import { DEBOUNCE_TRANSLATE_TIME } from '../constantes'
import { SpaceEnum } from '../redux/slices/translation'

export default (space: SpaceEnum) => {
  const reduxAction = useReduxAction()

  const translate = reduxAction(translationSlice.translate)

  return useDebouncedCallback((query) => {
    translate({
      query,
      space,
      remember: true,
    })
  }, DEBOUNCE_TRANSLATE_TIME)
}
