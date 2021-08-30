import React from 'react'
import clsx from 'clsx'
import './Checkbox.scss'
import { ReactComponent as Icon } from '../../assets/icons/checkbox-tick.svg'

export type CheckboxProps = JSX.IntrinsicElements['input'] & { disabled?: boolean }

const Checkbox: React.FC<CheckboxProps> = ({ children, disabled, className, ...props }) => {
  return (
    <div className={clsx('Checkbox', className, disabled && 'Checkbox_disabled')}>
      <input type="checkbox" className="Checkbox-input" disabled={disabled} {...props} />
      <div className="Checkbox-icon">
        <Icon className="Checkbox-tick" />
      </div>
    </div>
  )
}

export default React.memo(Checkbox)
