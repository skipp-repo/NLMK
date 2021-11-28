import React from 'react'
import clsx from 'clsx'
import './TranslationListTitle.scss'

export type TranslationListTitleProps = JSX.IntrinsicElements['div'] & {}

const TranslationListTitle: React.FC<TranslationListTitleProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div {...props} className={clsx('TranslationListTitle', className)}>
      {children}
    </div>
  )
}

export default React.memo(TranslationListTitle)
