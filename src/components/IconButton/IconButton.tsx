import React from 'react'
import clsx from 'clsx'
import './IconButton.scss'
import { ReactComponent } from '*.svg'

export type IconButtonProps = JSX.IntrinsicElements['div'] & {
  Icon?: typeof ReactComponent
  text: string
  disabled?: boolean
}

const IconButton: React.FC<IconButtonProps> = ({
  Icon,
  text,
  className,
  disabled,
  onClick,
  ...props
}) => {
  return (
    <div
      {...props}
      className={clsx('IconButton', className, {
        IconButton_disabled: disabled,
      })}
      onClick={!disabled ? onClick : undefined}
    >
      {Icon && <Icon className="IconButton-icon" />}

      <span className="IconButton-text">{text}</span>
    </div>
  )
}

export default React.memo(IconButton)
