import React from 'react'
import clsx from 'clsx'
import './TranslationCard.css'
import { ReactComponent as GlossaryIcon } from '../../assets/icons/open-book.svg'
import { ReactComponent as SpeechIcon } from '../../assets/icons/speech.svg'
import img from '../../assets/img/picture.jpg'

export type TranslationCardProps = JSX.IntrinsicElements['div'] & {
  input?: string
  word: string
  translation: string
  image?: string
  glossaries: string[]
  action?: React.ReactElement
  speech?: boolean
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
        <div className="TranslationCard-word">
          {word}
          {speech && (
            <div className="TranslationCard-speech">
              <SpeechIcon />
            </div>
          )}
        </div>
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
