import React from 'react'
import clsx from 'clsx'
import './TranslationCard.css'
import TranslationCardWord from './TranslationCardWord/TranslationCardWord'
import TranslationCardImage from './TranslationCardImage/TranslationCardImage'
import TranslationCardMeaning from './TranslationCardMeaning/TranslationCardMeaning'
import TranslationCardGlossaries from './TranslationCardGlossaries/TranslationCardGlossaries'

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
  return (
    <div {...props} className={clsx('TranslationCard', className)}>
      <TranslationCardImage src={image} />

      <div className="TranslationCard-content">
        <TranslationCardWord onSpeech={onSpeech} speech={speech} input={input}>
          {word}
        </TranslationCardWord>
        <TranslationCardMeaning>{translation}</TranslationCardMeaning>
        <TranslationCardGlossaries glossaries={glossaries} />
      </div>

      {action && <div className="TranslationCard-action">{action}</div>}
    </div>
  )
}

export default React.memo(TranslationCard)
