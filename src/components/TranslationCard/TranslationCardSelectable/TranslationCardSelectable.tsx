import React from 'react'
import clsx from 'clsx'
import './TranslationCardSelectable.scss'
import { PhraseTranslationLocal } from '../../../types'
import TranslationCardWord from '../TranslationCardWord/TranslationCardWord'
import TranslationCardImage from '../TranslationCardImage/TranslationCardImage'
import TranslationCardMeaning from '../TranslationCardMeaning/TranslationCardMeaning'
import TranslationCardGlossaries from '../TranslationCardGlossaries/TranslationCardGlossaries'
import Checkbox from '../../Checkbox/Checkbox'
import speak from '../../../utils/speak'
import { useDebouncedCallback } from 'use-debounce'

export type TranslationCardProps = Omit<JSX.IntrinsicElements['div'], 'onSelect'> & {
  input?: string
  item: PhraseTranslationLocal
  action?: React.ReactElement
  speech?: boolean
  onSpeech(): void
  onSelect(id: number, checked: boolean): void
}

const TranslationCardSelectable: React.FC<TranslationCardProps> = ({
  input,
  item,
  className,
  action,
  speech = false,
  onSpeech = () => {},
  onSelect = () => {},
  ...props
}) => {
  const imgSrc = item.images?.length ? item.images[0] : undefined

  const handleSelect = ({ target }) => {
    onSelect(item._id, target.checked)
  }

  const handleSpeech = useDebouncedCallback(() => {
    speak(item.translation, item.targetLang)
  }, 500)

  return (
    <div {...props} className={clsx('TranslationCardSelectable', className)}>
      <div className="TranslationCardSelectable-wrapper">
        <TranslationCardImage src={imgSrc} />

        <div className="TranslationCardSelectable-content">
          <TranslationCardWord
            className="TranslationCardSelectable-word"
            onSpeech={handleSpeech}
            speech={speech}
            input={input}
          >
            {item.text}
          </TranslationCardWord>
          <TranslationCardMeaning>{item.translation}</TranslationCardMeaning>
          {!!item.glossaries && <TranslationCardGlossaries glossaries={item.glossaries} />}
        </div>

        <Checkbox
          className="TranslationCardSelectable-checkbox"
          onChange={handleSelect}
          checked={item.selected}
        />
      </div>
    </div>
  )
}

export default React.memo(TranslationCardSelectable)
