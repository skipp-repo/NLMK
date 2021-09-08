import * as React from 'react'

export type UseModalReturn = [boolean, () => void, () => void]

export default (): UseModalReturn => {
  const [visible, setVisible] = React.useState(false)

  const hide = React.useCallback(() => {
    setVisible(false)
  }, [])

  const show = React.useCallback(() => {
    setVisible(true)
  }, [])

  return [visible, show, hide]
}
