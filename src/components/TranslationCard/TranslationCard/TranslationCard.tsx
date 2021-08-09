import React from 'react'
import clsx from 'clsx'
import useCollapse from 'react-collapsed'
import flatten from 'arr-flatten'
import './TranslationCard.scss'
import { TranslationResultItemLocal } from '../../../types'
import BookmarkButton from '../../BookmarkButton/BookmarkButton'
import TranslationCardWord from '../TranslationCardWord/TranslationCardWord'
import TranslationCardImage from '../TranslationCardImage/TranslationCardImage'
import TranslationCardMeaning from '../TranslationCardMeaning/TranslationCardMeaning'
import TranslationCardGlossaries from '../TranslationCardGlossaries/TranslationCardGlossaries'
import { ReactComponent as ArrowIcon } from '../../../assets/icons/arrow.svg'
import createTranslationString from '../../../utils/createTranslationString'

export type TranslationCardProps = JSX.IntrinsicElements['div'] & {
  input?: string
  items: TranslationResultItemLocal[]
  action?: React.ReactElement
  speech?: boolean
  inBookmarks?: boolean
  onSpeech(): void
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

  const renderTranslationItem = ({ translation }, index) => (
    <div className="TranslationCard-item" key={translation._id}>
      <TranslationCardImage src="" />

      <div className="TranslationCard-content">
        <TranslationCardWord onSpeech={onSpeech} speech={speech} input={input}>
          {translation.text}
        </TranslationCardWord>
        <TranslationCardMeaning>{translation.translation}</TranslationCardMeaning>
      </div>

      <button className="TranslationCard-action" onClick={handleOnAddToBookmarks(translation._id)}>
        <BookmarkButton active={false} />
      </button>
    </div>
  )

  const firstItem = items[0]

  const glossaries = flatten(
    items.map(({ translation }) => translation.glossaries).filter((glossary) => glossary !== null),
  )

  return (
    <div {...props} className={clsx('TranslationCard', className)}>
      <div className="TranslationCard-wrapper">
        <TranslationCardImage src="" />

        <div className="TranslationCard-content">
          <TranslationCardWord onSpeech={onSpeech} speech={speech} input={input}>
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
            <BookmarkButton />
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