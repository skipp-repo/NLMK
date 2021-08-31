import React from 'react'
import clsx from 'clsx'
import './Checkbox.scss'
import { ReactComponent as Icon } from '../../assets/icons/checkbox-tick.svg'

export type CheckboxProps = JSX.IntrinsicElements['input'] & {
  disabled?: boolean
  text?: string
  secondary?: boolean
}

const Checkbox: React.FC<CheckboxProps> = ({
  children,
  disabled,
  className,
  text,
  secondary,
  ...props
}) => {
  return (
    <label
      className={clsx(
        'Checkbox',
        className,
        disabled && 'Checkbox_disabled',
        secondary && 'Checkbox_secondary',
      )}
    >
      <div className="Checkbox-wrapper">
        <input type="checkbox" className="Checkbox-input" disabled={disabled} {...props} />
        <div className="Checkbox-icon">
          <Icon className="Checkbox-tick" />
        </div>
      </div>

      {!!text && <span className="Checkbox-text">{text}</span>}
    </label>
  )
}

export default React.memo(Checkbox)
