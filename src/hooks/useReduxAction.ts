import { useDispatch } from 'react-redux'
import { useCallback } from 'react'

export type Action = (params: never) => void

export default () => {
  const dispatch = useDispatch()

  function wrapAction<T extends Action>(func: T, dependencies?: never[]): T {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const callbackFunction = useCallback(
      (params: never) => {
        const actionObject = func(params)

        return dispatch(actionObject)
      },
      Array.isArray(dependencies) ? [dispatch, ...dependencies] : [dispatch],
    )

    return callbackFunction as T
  }

  return wrapAction
}
