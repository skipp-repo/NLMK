import React from 'react'
import clsx from 'clsx'
import './AddWordsItem.scss'
import { PhraseTranslationLocal } from '../../../types'
import TranslationCardWord from '../../TranslationCard/TranslationCardWord/TranslationCardWord'
import TranslationCardImage from '../../TranslationCard/TranslationCardImage/TranslationCardImage'
import TranslationCardMeaning from '../../TranslationCard/TranslationCardMeaning/TranslationCardMeaning'
import TranslationCardGlossaries from '../../TranslationCard/TranslationCardGlossaries/TranslationCardGlossaries'
import speak from '../../../utils/speak'
import { useDebouncedCallback } from 'use-debounce'
import { ReactComponent as PlusIcon } from '../../../assets/icons/plus.svg'

export type AddWordsItemProps = Omit<JSX.IntrinsicElements['div'], 'onAdd'> & {
  input?: string
  item: PhraseTranslationLocal
  action?: React.ReactElement
  speech?: boolean
  onAdd(word: string): void
}

const AddWordsItem: React.FC<AddWordsItemProps> = ({
  input,
  item,
  className,
  action,
  speech = false,
  onAdd = () => {},
  ...props
}) => {
  const imgSrc = item.images?.length ? item.images[0] : undefined

  const handleAdd = ({ target }) => {
    onAdd(item.translation)
  }

  const handleSpeech = useDebouncedCallback(() => {
    speak(item.translation, item.targetLang)
  }, 500)

  return (
    <div {...props} className={clsx('AddWordsItem', className)}>
      <div className="AddWordsItem-wrapper">
        <TranslationCardImage src={imgSrc} className="AddWordsItem-image" />

        <div className="AddWordsItem-content">
          <TranslationCardWord
            className="AddWordsItem-word"
            onSpeech={handleSpeech}
            speech={speech}
            input={input}
          >
            {item.text}
          </TranslationCardWord>
          <TranslationCardMeaning className="AddWordsItem-meaning">
            {item.translation}
          </TranslationCardMeaning>
          {!!item.glossaries && (
            <TranslationCardGlossaries
              className="AddWordsItem-glossaries"
              glossaries={item.glossaries}
            />
          )}
        </div>

        <div className="AddWordsItem-button" onClick={handleAdd}>
          <PlusIcon />
        </div>
      </div>
    </div>
  )
}

export default React.memo(AddWordsItem)
