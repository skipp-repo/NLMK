import React from 'react'
import clsx from 'clsx'
import './TranslationCard.css'
import BookmarkButton from '../BookmarkButton/BookmarkButton'
import TranslationCardWord from './TranslationCardWord/TranslationCardWord'
import TranslationCardImage from './TranslationCardImage/TranslationCardImage'
import TranslationCardMeaning from './TranslationCardMeaning/TranslationCardMeaning'
import TranslationCardGlossaries from './TranslationCardGlossaries/TranslationCardGlossaries'

export type TranslationCardProps = JSX.IntrinsicElements['div'] & {
  input?: string
  word: string
  translations: string[]
  image?: string
  glossaries: string[]
  action?: React.ReactElement
  speech?: boolean
  inBookmarks?: boolean
  onSpeech(): void
}

const TranslationCard: React.FC<TranslationCardProps> = ({
  children,
  input,
  word,
  translations,
  image,
  glossaries,
  className,
  action,
  speech = false,
  inBookmarks = false,
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
        <TranslationCardMeaning>{translations[0]}</TranslationCardMeaning>
        <TranslationCardGlossaries glossaries={glossaries} />
      </div>

      {inBookmarks && (
        <div className="TranslationCard-action">
          <BookmarkButton active={inBookmarks} />
        </div>
      )}
    </div>
  )
}

export default React.memo(TranslationCard)
