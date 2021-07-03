import React from 'react'
import clsx from 'clsx'
import './TranslationCard.css'
import { ReactComponent as GlossaryIcon } from '../../assets/icons/open-book.svg'
import img from '../../assets/img/picture.jpg'
import TranslationCardWord from './TranslationCardWord/TranslationCardWord'

export type TranslationCardProps = JSX.IntrinsicElements['div'] & {
  input?: string
  word: string
  translation: string
  image?: string
  glossaries: string[]
  action?: React.ReactElement
  speech?: boolean
  onSpeech(): void
}

const TranslationCard: React.FC<TranslationCardProps> = ({
  children,
  input,
  word,
  translation,
  image,
  glossaries,
  className,
  action,
  speech = false,
  onSpeech = () => {},
  ...props
}) => {
  const renderGlossary = (glossary: string) => (
    <div className="TranslationCard-glossaries-list-text">{glossary}</div>
  )
  return (
    <div {...props} className={clsx('TranslationCard', className)}>
      {image ? (
        <img className="TranslationCard-image" src={image} alt="" />
      ) : (
        <img className="TranslationCard-image" src={img} alt="" />
      )}
      <div className="TranslationCard-content">
        <TranslationCardWord onSpeech={onSpeech} speech={speech} input={input}>
          {word}
        </TranslationCardWord>
        <div className="TranslationCard-translation">{translation}</div>
        <div className="TranslationCard-glossaries">
          <GlossaryIcon />
          <div className="TranslationCard-glossaries-list">{glossaries.map(renderGlossary)}</div>
        </div>
      </div>

      {action && <div className="TranslationCard-action">{action}</div>}
    </div>
  )
}

export default React.memo(TranslationCard)
