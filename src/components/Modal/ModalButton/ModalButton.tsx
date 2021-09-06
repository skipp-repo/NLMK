import React from 'react'
import clsx from 'clsx'
import './ModalButton.scss'

export type ModalButtonProps = JSX.IntrinsicElements['div'] & {
  text: string
  secondary?: boolean
}

const ModalButton: React.FC<ModalButtonProps> = ({
  text,
  secondary = false,
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      className={clsx('ModalButton', className, { ModalButton_secondary: secondary })}
    >
      {text}
    </div>
  )
}

export default React.memo(ModalButton)
