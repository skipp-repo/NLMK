import React from 'react'
import clsx from 'clsx'
import useCollapse from 'react-collapsed'
import flatten from 'arr-flatten'
import './TranslationCard.scss'
import { useDebouncedCallback } from 'use-debounce'
import { TranslationResultItemLocal } from '../../../types'
import speak from '../../../utils/speak'
import BookmarkButton from '../../BookmarkButton/BookmarkButton'
import TranslationCardWord from '../TranslationCardWord/TranslationCardWord'
import TranslationCardImage from '../TranslationCardImage/TranslationCardImage'
import TranslationCardMeaning from '../TranslationCardMeaning/TranslationCardMeaning'
import TranslationCardGlossaries from '../TranslationCardGlossaries/TranslationCardGlossaries'
import { ReactComponent as ArrowIcon } from '../../../assets/icons/arrow.svg'
import createTranslationString from '../../../utils/createTranslationString'
import TranslationCardItem from './TranslationCardItem'

export type TranslationCardProps = JSX.IntrinsicElements['div'] & {
  input?: string
  items: TranslationResultItemLocal[]
  action?: React.ReactElement
  speech?: boolean
  inBookmarks?: boolean
  onSpeech?(): void
  onAddToBookmarks(id: number): void
}

const TranslationCard: React.FC<TranslationCardProps> = ({
  input,
  items,
  className,
  action,
  speech = false,
  inBookmarks = false,
  onSpeech = () => {},
  onAddToBookmarks = () => {},
  ...props
}) => {
  const { getCollapseProps, getToggleProps } = useCollapse()

  const renderTranslationsString = createTranslationString(items)

  const handleOnAddToBookmarks = (id: number) => () => {
    onAddToBookmarks(id)
  }

  const handleSpeech = useDebouncedCallback(() => {
    let word = firstItem.translation.translation
    let lang = firstItem.translation.targetLang

    if (firstItem.translation.targetLang === 'ru') {
      word = firstItem.translation.text
      lang = firstItem.translation.sourceLang
    }

    speak(word, lang)

    onSpeech()
  }, 500)

  const renderTranslationItem = ({ translation, images }, index) => {
    const imgSrc = images?.length && images[0]

    return (
      <TranslationCardItem
        key={index}
        translation={translation}
        imgSrc={imgSrc}
        speech={speech}
        input={input}
        onAddToBookmarks={handleOnAddToBookmarks(translation._id)}
      />
    )
  }

  const firstItem = items.find(({ images }) => !!images) || items[0]

  const glossaries = flatten(
    items.map(({ translation }) => translation.glossaries).filter((glossary) => glossary !== null),
  )

  const imgSrc = firstItem?.images?.length && firstItem.images[0]

  return (
    <div {...props} className={clsx('TranslationCard', className)}>
      <div className="TranslationCard-wrapper">
        <TranslationCardImage src={imgSrc} />

        <div className="TranslationCard-content">
          <TranslationCardWord onSpeech={handleSpeech} speech={speech} input={input}>
            {firstItem.translation.text}
          </TranslationCardWord>
          <TranslationCardMeaning>{renderTranslationsString}</TranslationCardMeaning>
          <TranslationCardGlossaries glossaries={glossaries} />
        </div>

        {items.length === 1 && (
          <button
            className="TranslationCard-action"
            onClick={handleOnAddToBookmarks(items[0].translation._id)}
          >
            <BookmarkButton active={firstItem.inBookmarks} />
          </button>
        )}

        {items.length > 1 && (
          <div className="TranslationCard-arrow-button" {...getToggleProps()}>
            <ArrowIcon />
          </div>
        )}
      </div>

      {items.length > 1 && (
        <div className="TranslationCard-items" {...getCollapseProps()}>
          {items?.map(renderTranslationItem)}
        </div>
      )}
    </div>
  )
}

export default React.memo(TranslationCard)
