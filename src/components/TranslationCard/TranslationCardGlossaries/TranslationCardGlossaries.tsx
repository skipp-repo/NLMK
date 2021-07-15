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
    <div className="TranslationCardGlossaries-list-text" key={glossary}>
      {glossary}
    </div>
  )

  if (glossaries.length) {
    return (
      <div {...props} className={clsx('TranslationCardGlossaries', className)}>
        <GlossaryIcon />
        <div className="TranslationCardGlossaries-list">{glossaries.map(renderGlossary)}</div>
      </div>
    )
  }

  return null
}

export default React.memo(TranslationCardGlossaries)
