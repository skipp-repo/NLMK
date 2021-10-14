import noop from '@stdlib/utils-noop'
import React from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { PhraseTranslationLocal } from '../../../types'
import speak from '../../../utils/speak'
import BookmarkButton from '../../BookmarkButton/BookmarkButton'
import TranslationCardImage from '../TranslationCardImage/TranslationCardImage'
import TranslationCardMeaning from '../TranslationCardMeaning/TranslationCardMeaning'
import TranslationCardWord from '../TranslationCardWord/TranslationCardWord'

export type TranslationCardItemProps = JSX.IntrinsicElements['div'] & {
  input?: string
  translation: PhraseTranslationLocal
  imgSrc: string
  speech?: boolean
  onAddToBookmarks(): void
}

const TranslationCardItem: React.FC<TranslationCardItemProps> = ({
  translation,
  speech,
  input,
  imgSrc,
  onAddToBookmarks = noop,
  ...props
}) => {
  const handleSpeech = useDebouncedCallback(() => {
    let word = translation.translation
    let lang = translation.targetLang

    if (translation.targetLang === 'ru') {
      word = translation.text
      lang = translation.sourceLang
    }

    speak(word, lang)
  }, 500)

  return (
    <div className="TranslationCard-item" key={translation._id}>
      <TranslationCardImage src={imgSrc} />

      <div className="TranslationCard-content">
        <TranslationCardWord onSpeech={handleSpeech} speech={speech} input={input}>
          {translation.text}
        </TranslationCardWord>
        <TranslationCardMeaning>{translation.translation}</TranslationCardMeaning>
      </div>

      <button className="TranslationCard-action" onClick={onAddToBookmarks}>
        <BookmarkButton active={false} />
      </button>
    </div>
  )
}

export default React.memo(TranslationCardItem)
