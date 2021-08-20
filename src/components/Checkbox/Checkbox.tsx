import React from 'react'
import clsx from 'clsx'
import './Checkbox.scss'

export type CheckboxProps = JSX.IntrinsicElements['div'] & {}

const Checkbox: React.FC<CheckboxProps> = ({ children, className, ...props }) => {
  return (
    <div {...props} className={clsx('Checkbox', className)}>
      <input type="checkbox" className="Checkbox-input" />
      <div className="Checkbox-icon"></div>
    </div>
  )
}

export default React.memo(Checkbox)
