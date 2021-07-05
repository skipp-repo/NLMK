import React from 'react'
import clsx from 'clsx'
import './TranslationCardGlossaries.css'
import { ReactComponent as GlossaryIcon } from '../../../assets/icons/open-book.svg'

export type TranslationCardGlossariesProps = JSX.IntrinsicElements['div'] & {
  glossaries: string[]
}

const TranslationCardGlossaries: React.FC<TranslationCardGlossariesProps> = ({
  children,
  glossaries,
  className,
  ...props
}) => {
  const renderGlossary = (glossary: string) => (
    <div className="TranslationCardGlossaries-list-text">{glossary}</div>
  )

  return (
    <div {...props} className={clsx('TranslationCardGlossaries', className)}>
      <GlossaryIcon />
      <div className="TranslationCardGlossaries-list">{glossaries.map(renderGlossary)}</div>
    </div>
  )
}

export default React.memo(TranslationCardGlossaries)