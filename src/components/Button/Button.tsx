import React from 'react'
import clsx from 'clsx'
import './Button.scss'

export type ButtonProps = JSX.IntrinsicElements['button'] & {
  children: string
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button {...props} className={clsx('Button', className)}>
      {children}
    </button>
  )
}

export default React.memo(Button)
