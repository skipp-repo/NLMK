import React from 'react'
import clsx from 'clsx'
import './EditorTranslationPopup.scss'
import Highlighter from 'react-highlight-words'
import { useSelector } from 'react-redux'
import useReduxAction from '../../hooks/useReduxAction'
import { SpaceEnum, Translate } from '../../redux/slices/translation'
import * as translationSlice from '../../redux/slices/translation'
import { EditFolder } from '../../redux/slices/vocabs'
import * as vocabsSlice from '../../redux/slices/vocabs'
import Loader from '../Loader/Loader'
import TranslationCard from '../TranslationCard/TranslationCard/TranslationCard'
import TranslationListTitle from '../TranslationListTitle/TranslationListTitle'

export type EditorTranslationPopupProps = JSX.IntrinsicElements['div'] & {
  word: string
  sentence: string
}

const EditorTranslationPopup: React.FC<EditorTranslationPopupProps> = React.forwardRef(
  ({ word, sentence, className, ...props }, ref) => {
    const reduxAction = useReduxAction()

    const translationData = useSelector(translationSlice.selectors.documentsPopupSearchResults)
    const { translateLoading } = useSelector(translationSlice.selectors.translationFlags)

    const isLoading = !translationData?.results?.length && translateLoading

    const search = reduxAction((params: Omit<Translate, 'space'>) =>
      translationSlice.translate({ space: SpaceEnum.DocumentsPopup, ...params }),
    )

    const addToBookmarks = reduxAction(({ cardsToAdd }: Omit<EditFolder, 'id'>) =>
      vocabsSlice.editFolder({ id: 'default', cardsToAdd }),
    )

    const clearSearchData = reduxAction(() =>
      translationSlice.clearSearchData({ space: SpaceEnum.DocumentsPopup }),
    )

    const handleAddToBookmarks = (id: number) => {
      addToBookmarks({ cardsToAdd: [id] })
    }

    React.useEffect(() => {
      search({
        query: word,
        filters: { common: true },
      })

      return () => {
        clearSearchData()
      }
    }, [word])

    const renderTranslationCard = (data) => {
      return (
        <TranslationCard
          key={data._id}
          className="EditorTranslationPopup-list-item"
          items={data}
          speech
          onAddToBookmarks={handleAddToBookmarks}
        />
      )
    }

    return (
      <div {...props} className={clsx('EditorTranslationPopup', className)}>
        <div className="EditorTranslationPopup-sentence">
          <Highlighter
            highlightClassName="EditorTranslationPopup-sentence_highlight"
            searchWords={[word]}
            autoEscape={true}
            textToHighlight={sentence}
          />
        </div>

        {isLoading && <Loader />}

        {!isLoading && (
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
        )}
      </div>
    )
  },
)

export default React.memo(EditorTranslationPopup)
