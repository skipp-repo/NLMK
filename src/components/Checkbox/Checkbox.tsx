import React from 'react'
import clsx from 'clsx'
import './Checkbox.scss'
import { ReactComponent as Icon } from '../../assets/icons/checkbox-tick.svg'

export type CheckboxProps = JSX.IntrinsicElements['input'] & {
  text?: string
  secondary?: boolean
  textClassName?: string
  checked?: boolean | undefined
}

const Checkbox: React.FC<CheckboxProps> = ({
  children,
  disabled,
  className,
  textClassName,
  text,
  secondary,

  checked,
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
        <input
          type="checkbox"
          className="Checkbox-input"
          disabled={disabled}
          checked={!!checked}
          {...props}
        />
        <div className="Checkbox-icon">
          <Icon className="Checkbox-tick" />
        </div>
      </div>

      {!!text && <span className={clsx('Checkbox-text', textClassName)}>{text}</span>}
    </label>
  )
}

export default React.memo(Checkbox)
