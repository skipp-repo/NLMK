import React from 'react'
import clsx from 'clsx'
import useCollapse from 'react-collapsed'
import './TranslationCard.scss'
import { TranslationResultItemLocal } from '../../types'
import BookmarkButton from '../BookmarkButton/BookmarkButton'
import TranslationCardWord from './TranslationCardWord/TranslationCardWord'
import TranslationCardImage from './TranslationCardImage/TranslationCardImage'
import TranslationCardMeaning from './TranslationCardMeaning/TranslationCardMeaning'
import TranslationCardGlossaries from './TranslationCardGlossaries/TranslationCardGlossaries'
import { ReactComponent as ArrowIcon } from '../../assets/icons/arrow.svg'

type TranslationItem = {
  translation: string
  image: string
  inBookmarks: boolean
}

export type TranslationCardProps = JSX.IntrinsicElements['div'] & {
  input?: string
  items: TranslationResultItemLocal[]
  action?: React.ReactElement
  speech?: boolean
  inBookmarks?: boolean
  onSpeech(): void
}

const TranslationCard: React.FC<TranslationCardProps> = ({
  input,
  items,
  className,
  action,
  speech = false,
  inBookmarks = false,
  onSpeech = () => {},
  ...props
}) => {
  const { getCollapseProps, getToggleProps } = useCollapse()

  const renderTranslationsString = items
    ?.map(({ translation }) => translation?.translation || '')
    .join(', ')

  const renderTranslationItem = ({ translation }, index) => (
    <div className="TranslationCard-item" key={`${index}-${translation}`}>
      <TranslationCardImage src="" />

      <div className="TranslationCard-content">
        <TranslationCardWord onSpeech={onSpeech} speech={speech} input={input}>
          {translation.text}
        </TranslationCardWord>
        <TranslationCardMeaning>{translation.translation}</TranslationCardMeaning>
      </div>

      <div className="TranslationCard-action">
        <BookmarkButton active={false} />
      </div>
    </div>
  )

  const firstItem = items[0]

  // console.log(items, firstItem)

  return (
    <div {...props} className={clsx('TranslationCard', className)}>
      <div className="TranslationCard-wrapper">
        <TranslationCardImage src="" />

        <div className="TranslationCard-content">
          <TranslationCardWord onSpeech={onSpeech} speech={speech} input={input}>
            {firstItem.translation.text}
          </TranslationCardWord>
          <TranslationCardMeaning>{renderTranslationsString}</TranslationCardMeaning>
          <TranslationCardGlossaries glossaries={firstItem.translation.glossaries} />
        </div>

        {/*{inBookmarks && !translationIsArray && (*/}
        {/*  <div className="TranslationCard-action">*/}
        {/*    <BookmarkButton active={inBookmarks} />*/}
        {/*  </div>*/}
        {/*)}*/}

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
