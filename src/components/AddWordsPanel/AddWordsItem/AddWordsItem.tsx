import React from 'react'
import clsx from 'clsx'
import './AddWordsItem.scss'
import useCollapse from 'react-collapsed'
import flatten from 'arr-flatten'
import { ReactComponent as ArrowIcon } from '../../../assets/icons/arrow.svg'
import { TranslationResultItemLocal } from '../../../types'
import createTranslationString from '../../../utils/createTranslationString'
import TranslationCardWord from '../../TranslationCard/TranslationCardWord/TranslationCardWord'
import TranslationCardImage from '../../TranslationCard/TranslationCardImage/TranslationCardImage'
import TranslationCardMeaning from '../../TranslationCard/TranslationCardMeaning/TranslationCardMeaning'
import TranslationCardGlossaries from '../../TranslationCard/TranslationCardGlossaries/TranslationCardGlossaries'
import speak from '../../../utils/speak'
import { useDebouncedCallback } from 'use-debounce'
import { ReactComponent as PlusIcon } from '../../../assets/icons/plus.svg'

export type AddWordsItemProps = Omit<JSX.IntrinsicElements['div'], 'onAdd'> & {
  input?: string
  items: TranslationResultItemLocal[]
  action?: React.ReactElement
  speech?: boolean
  onAdd(word: string): void
}

const AddWordsItem: React.FC<AddWordsItemProps> = ({
  input,
  items,
  className,
  action,
  speech = false,
  onAdd = () => {},
  ...props
}) => {
  const { getCollapseProps, getToggleProps } = useCollapse()

  const firstItem = items.find(({ images }) => !!images) || items[0]
  const glossaries = flatten(
    items.map(({ translation }) => translation.glossaries).filter((glossary) => glossary !== null),
  )

  const imgSrc = firstItem?.images?.length && firstItem.images[0]

  const renderTranslationsString = createTranslationString(items)

  const handleSpeech = useDebouncedCallback(() => {
    let word = firstItem.translation.translation
    let lang = firstItem.translation.targetLang

    if (firstItem.translation.targetLang === 'ru') {
      word = firstItem.translation.text
      lang = firstItem.translation.sourceLang
    }

    speak(word, lang)
  }, 500)

  const handleAdd = () => {
    onAdd(firstItem.translation.translation)
  }

  const renderTranslationItem = ({ translation, images }, key) => {
    const imgSrc = images?.length && images[0]

    const handleAdd = () => {
      onAdd(translation.translation)
    }

    return (
      <div className="AddWordsItem AddWordsItem_listItem" key={key}>
        <div className="AddWordsItem-wrapper">
          <TranslationCardImage src={imgSrc} className="AddWordsItem-image" />

          <div className="AddWordsItem-content">
            <TranslationCardWord
              className="AddWordsItem-word"
              onSpeech={handleSpeech}
              speech={speech}
              input={input}
            >
              {translation.text}
            </TranslationCardWord>
            <TranslationCardMeaning className="AddWordsItem-meaning">
              {translation.translation}
            </TranslationCardMeaning>
          </div>

          <div className="AddWordsItem-button" onClick={handleAdd}>
            <PlusIcon />
          </div>
        </div>
      </div>
    )
  }

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
            {firstItem.translation.text}
          </TranslationCardWord>
          <TranslationCardMeaning className="AddWordsItem-meaning">
            {renderTranslationsString}
          </TranslationCardMeaning>

          {!!glossaries?.length && (
            <TranslationCardGlossaries
              className="AddWordsItem-glossaries"
              glossaries={glossaries}
            />
          )}
        </div>

        {items.length === 1 && (
          <div className="AddWordsItem-button" onClick={handleAdd}>
            <PlusIcon />
          </div>
        )}

        {items.length > 1 && (
          <div className="AddWordsItem-button" {...getToggleProps()}>
            <ArrowIcon />
          </div>
        )}
      </div>

      {items.length > 1 && <div {...getCollapseProps()}>{items?.map(renderTranslationItem)}</div>}
    </div>
  )
}

export default React.memo(AddWordsItem)
