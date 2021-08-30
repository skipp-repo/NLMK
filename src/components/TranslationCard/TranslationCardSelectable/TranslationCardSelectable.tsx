import React from 'react'
import clsx from 'clsx'
import './TranslationCardSelectable.scss'
import { PhraseTranslationLocal } from '../../../types'
import TranslationCardWord from '../TranslationCardWord/TranslationCardWord'
import TranslationCardImage from '../TranslationCardImage/TranslationCardImage'
import TranslationCardMeaning from '../TranslationCardMeaning/TranslationCardMeaning'
import TranslationCardGlossaries from '../TranslationCardGlossaries/TranslationCardGlossaries'
import Checkbox from '../../Checkbox/Checkbox'

export type TranslationCardProps = JSX.IntrinsicElements['div'] & {
  input?: string
  item: PhraseTranslationLocal
  action?: React.ReactElement
  speech?: boolean
  onSpeech(): void
}

const TranslationCardSelectable: React.FC<TranslationCardProps> = ({
  input,
  item,
  className,
  action,
  speech = false,
  onSpeech = () => {},
  ...props
}) => {
  return (
    <div {...props} className={clsx('TranslationCardSelectable', className)}>
      <div className="TranslationCardSelectable-wrapper">
        <TranslationCardImage src="" />

        <div className="TranslationCardSelectable-content">
          <TranslationCardWord
            className="TranslationCardSelectable-word"
            onSpeech={onSpeech}
            speech={speech}
            input={input}
          >
            {item.text}
          </TranslationCardWord>
          <TranslationCardMeaning>{item.translation}</TranslationCardMeaning>
          {!!item.glossaries && <TranslationCardGlossaries glossaries={item.glossaries} />}
        </div>

        <Checkbox className="TranslationCardSelectable-checkbox" />
      </div>
    </div>
  )
}

export default React.memo(TranslationCardSelectable)
