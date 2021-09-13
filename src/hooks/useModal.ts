import { Dispatch, SetStateAction } from 'react'
import * as React from 'react'

export type UseModalReturn = [
  boolean,
  () => void,
  () => void,
  any,
  Dispatch<SetStateAction<any | undefined>>,
]

export default (): UseModalReturn => {
  const [visible, setVisible] = React.useState(false)
  const [data, setData] = React.useState()

  const hide = React.useCallback(() => {
    setVisible(false)
  }, [])

  const show = React.useCallback(() => {
    setVisible(true)
  }, [])

  return [visible, show, hide, data, setData]
}
