import React from 'react'
import clsx from 'clsx'
import useCollapse from 'react-collapsed'
import './TranslationCard.scss'
import BookmarkButton from '../BookmarkButton/BookmarkButton'
import TranslationCardWord from './TranslationCardWord/TranslationCardWord'
import TranslationCardImage from './TranslationCardImage/TranslationCardImage'
import TranslationCardMeaning from './TranslationCardMeaning/TranslationCardMeaning'
import TranslationCardGlossaries, {
  Glossary,
} from './TranslationCardGlossaries/TranslationCardGlossaries'
import { ReactComponent as ArrowIcon } from '../../assets/icons/arrow.svg'

type TranslationItem = {
  translation: string
  image: string
  inBookmarks: boolean
}

export type TranslationCardProps = JSX.IntrinsicElements['div'] & {
  input?: string
  word: string
  translation: string | TranslationItem[]
  image?: string
  glossaries: Glossary[]
  action?: React.ReactElement
  speech?: boolean
  inBookmarks?: boolean
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
  inBookmarks = false,
  onSpeech = () => {},
  ...props
}) => {
  const { getCollapseProps, getToggleProps } = useCollapse()

  const translationIsArray = translation instanceof Array

  const renderTranslationsString =
    translationIsArray &&
    // @ts-ignore
    translation?.map(({ translation }: TranslationItem) => translation).join(', ')

  const renderTranslationItem = ({ translation, inBookmarks }, index) => (
    <div className="TranslationCard-item" key={`${index}-${translation}`}>
      <TranslationCardImage src={image} />

      <div className="TranslationCard-content">
        <TranslationCardWord onSpeech={onSpeech} speech={speech} input={input}>
          {word}
        </TranslationCardWord>
        <TranslationCardMeaning>{translation}</TranslationCardMeaning>
      </div>

      <div className="TranslationCard-action">
        <BookmarkButton active={inBookmarks} />
      </div>
    </div>
  )

  const renderTranslationItems = () => {
    return typeof translation !== 'string' ? translation?.map(renderTranslationItem) : null
  }

  return (
    <div {...props} className={clsx('TranslationCard', className)}>
      <div className="TranslationCard-wrapper">
        <TranslationCardImage src={image} />

        <div className="TranslationCard-content">
          <TranslationCardWord onSpeech={onSpeech} speech={speech} input={input}>
            {word}
          </TranslationCardWord>
          <TranslationCardMeaning>
            {typeof translation === 'string' ? translation : renderTranslationsString}
          </TranslationCardMeaning>
          <TranslationCardGlossaries glossaries={glossaries} />
        </div>

        {inBookmarks && !translationIsArray && (
          <div className="TranslationCard-action">
            <BookmarkButton active={inBookmarks} />
          </div>
        )}

        {translationIsArray && (
          <div className="TranslationCard-arrow-button" {...getToggleProps()}>
            <ArrowIcon />
          </div>
        )}
      </div>

      <div className="TranslationCard-items" {...getCollapseProps()}>
        {renderTranslationItems()}
      </div>
    </div>
  )
}

export default React.memo(TranslationCard)
