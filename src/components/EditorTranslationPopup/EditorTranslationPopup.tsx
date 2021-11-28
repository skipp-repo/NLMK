import React from 'react'
import clsx from 'clsx'
import './EditorTranslationPopup.scss'
import { useSelector } from 'react-redux'
import useReduxAction from '../../hooks/useReduxAction'
import { SpaceEnum, Translate } from '../../redux/slices/translation'
import * as translationSlice from '../../redux/slices/translation'
import { EditFolder } from '../../redux/slices/vocabs'
import * as vocabsSlice from '../../redux/slices/vocabs'
import TranslationCard from '../TranslationCard/TranslationCard/TranslationCard'
import TranslationListTitle from '../TranslationListTitle/TranslationListTitle'

export type EditorTranslationPopupProps = JSX.IntrinsicElements['div'] & {
  word: string
  sentence: string
}

const EditorTranslationPopup: React.FC<EditorTranslationPopupProps> = ({
  word,
  sentence,
  className,
  ...props
}) => {
  const reduxAction = useReduxAction()

  const translationData = useSelector(translationSlice.selectors.documentsVocabsSearchResults) // TODO

  const search = reduxAction((params: Omit<Translate, 'space'>) =>
    translationSlice.translate({ space: SpaceEnum.DocumentsVocabs, ...params }),
  )

  const addToBookmarks = reduxAction(({ cardsToAdd }: Omit<EditFolder, 'id'>) =>
    vocabsSlice.editFolder({ id: 'default', cardsToAdd }),
  )

  const handleAddToBookmarks = (id: number) => {
    addToBookmarks({ cardsToAdd: [id] })
  }

  React.useEffect(() => {
    search({
      query: word,
      filters: { common: true },
    })
  }, [word])

  const renderTranslationCard = (data) => {
    return (
      <TranslationCard
        key={data._id}
        className="AddWordsPanel-list-item"
        items={data}
        speech
        onAddToBookmarks={handleAddToBookmarks}
      />
    )
  }

  return (
    <div {...props} className={clsx('EditorTranslationPopup', className)}>
      <div className="EditorTranslationPopup-sentence">{sentence}</div>

      <div className="EditorTranslationPopup-items">
        {!!translationData?.results?.length && (
          <div className="EditorTranslationPopup-item">
            <TranslationListTitle className="EditorTranslationPopup-result-title">
              Результат поиска
            </TranslationListTitle>

            <div className="EditorTranslationPopup-list">
              {translationData?.results?.map(renderTranslationCard)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default React.memo(EditorTranslationPopup)
