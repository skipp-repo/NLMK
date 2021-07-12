import * as React from 'react'
import { useDispatch } from 'react-redux'

type WrapActionReturn = (params?: any) => void
export type UseReduxActionReturn = (func: Function, dependencies?: any[]) => WrapActionReturn

export default (): UseReduxActionReturn => {
  const dispatch = useDispatch()

  const wrapAction = (func: Function, dependencies): WrapActionReturn =>
    React.useCallback(
      (params) => {
        const actionObject = func(params)

        dispatch(actionObject)
      },
      Array.isArray(dependencies) ? [dispatch, ...dependencies] : [dispatch],
    )

  return wrapAction
}
