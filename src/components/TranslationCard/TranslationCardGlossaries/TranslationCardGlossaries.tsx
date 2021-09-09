import React from 'react'
import clsx from 'clsx'
import './TranslationCardGlossaries.scss'
import { ReactComponent as GlossaryIcon } from '../../../assets/icons/open-book.svg'

export type Glossary = {
  _id: string
  name: string
}

export type TranslationCardGlossariesProps = JSX.IntrinsicElements['div'] & {
  glossaries: Glossary[]
}

const TranslationCardGlossaries: React.FC<TranslationCardGlossariesProps> = ({
  children,
  glossaries,
  className,
  ...props
}) => {
  const renderGlossary = (glossary: Glossary) => {
    if (glossary) {
      return (
        <div className="TranslationCardGlossaries-list-text" key={glossary._id}>
          {glossary.name}
        </div>
      )
    }
  }

  if (glossaries?.length) {
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
