import React from 'react'
import clsx from 'clsx'
import './ModalTitle.scss'

export type ModalTitleProps = JSX.IntrinsicElements['h1'] & {}

const ModalTitle: React.FC<ModalTitleProps> = ({ children, className, ...props }) => {
  return (
    <div {...props} className={clsx('ModalTitle', className)}>
      {children}
    </div>
  )
}

export default React.memo(ModalTitle)
