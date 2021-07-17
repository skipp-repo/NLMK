import React from 'react'
import clsx from 'clsx'
import './TranslationCardMeaning.scss'

export type TranslationCardMeaningProps = JSX.IntrinsicElements['div'] & {}

const TranslationCardMeaning: React.FC<TranslationCardMeaningProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div {...props} className={clsx('TranslationCardMeaning', className)}>
      {children}
    </div>
  )
}

export default React.memo(TranslationCardMeaning)
