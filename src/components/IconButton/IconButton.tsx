import React from 'react'
import clsx from 'clsx'
import './IconButton.scss'
import { ReactComponent } from '*.svg'

export type IconButtonProps = JSX.IntrinsicElements['div'] & {
  Icon?: typeof ReactComponent
  text: string
}

const IconButton: React.FC<IconButtonProps> = ({ Icon, text, className, onClick, ...props }) => {
  return (
    <div {...props} className={clsx('IconButton', className)} onClick={onClick}>
      {Icon && <Icon className="IconButton-icon" />}

      <span className="IconButton-text">{text}</span>
    </div>
  )
}

export default React.memo(IconButton)
