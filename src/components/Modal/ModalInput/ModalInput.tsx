import React from 'react'
import clsx from 'clsx'
import './ModalInput.scss'

export type ModalInputProps = JSX.IntrinsicElements['input'] & {}

const ModalInput: React.FC<ModalInputProps> = ({ children, placeholder, className, ...props }) => {
  return <input {...props} className={clsx('ModalInput', className)} placeholder={placeholder} />
}

export default React.memo(ModalInput)
