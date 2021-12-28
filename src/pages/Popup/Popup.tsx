import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useSelector } from 'react-redux'
import useCollapse from 'react-collapsed'
import { useDebouncedCallback } from 'use-debounce'
import './Popup.scss'
import TranslationListTitle from '../../components/TranslationListTitle/TranslationListTitle'
import PopupHeader from '../../containers/PopupHeader/PopupHeader'
import PopupSearch from '../../components/PopupSearch/PopupSearch'
import TranslationCard from '../../components/TranslationCard/TranslationCard/TranslationCard'
import Loader from '../../components/Loader/Loader'
import TrainingSlider from '../../components/TrainingSlider/TrainingSlider'
import ErrorFallback from '../../components/ErrorFallback/ErrorFallback'
import useReduxAction from '../../hooks/useReduxAction'
import * as userSlice from '../../redux/slices/user'
import * as translationSlice from '../../redux/slices/translation'
import * as autocompleteSlice from '../../redux/slices/autocomplete'
import * as appSlice from '../../redux/slices/app'
import { EditFolder } from '../../redux/slices/vocabs'
import * as vocabsSlice from '../../redux/slices/vocabs'

const Popup = () => {
  const reduxAction = useReduxAction()

  const queryRef = React.useRef('')

  const translationData = useSelector(translationSlice.selectors.popupSearchResults)
  const { translateLoading } = useSelector(translationSlice.selectors.translationFlags)
  const autoCompleteData = useSelector(
    autocompleteSlice.selectors.autocompleteByQuery(queryRef.current),
  )
  const translationHistory = useSelector(userSlice.selectors.history)
  const { getStatusLoading } = useSelector(userSlice.selectors.flags)
  const showTrainingSlider = useSelector(appSlice.selectors.showTrainingSlider)

  const getData = reduxAction(appSlice.getData)
  const translate = reduxAction(translationSlice.translate)
  const autocomplete = reduxAction(autocompleteSlice.autocomplete)
  const hideTrainingSlider = reduxAction(appSlice.hideTrainingSlider)
  const clearState = reduxAction(userSlice.clearUserState)
  const addToBookmarks = reduxAction(({ cardsToAdd }: Omit<EditFolder, 'id'>) =>
    vocabsSlice.editFolder({ id: 'default', cardsToAdd }),
  )

  const handleOpenMain = () => window.open('main.html')

  const handleAddToBookmarks = (id: number) => {
    addToBookmarks({ cardsToAdd: [id] })
  }

  const { getCollapseProps, getToggleProps } = useCollapse({
    defaultExpanded: true,
    // onCollapseEnd: hideTrainingSlider,
    onCollapseStart: hideTrainingSlider,
  })

  const handleSpeech = () => {}

  const renderTranslationCard = (data) => {
    return (
      <TranslationCard
        // key={_id}
        className="Popup-cards-list-item"
        input={translationData?.searchPhrase}
        items={data}
        onSpeech={handleSpeech}
        onAddToBookmarks={handleAddToBookmarks}
        speech
      />
    )
  }

  const renderHistoryCard = React.useCallback(
    ({ results, request: { q } }) => {
      return results?.map((data) => {
        return (
          <TranslationCard
            key={data?.translation?._id}
            className="Popup-cards-list-item"
            input={q}
            items={data}
            onSpeech={handleSpeech}
            onAddToBookmarks={handleAddToBookmarks}
            speech
          />
        )
      })
    },
    [translationHistory],
  )

  const debouncedTranslate = useDebouncedCallback((query) => {
    translate({
      query,
      remember: true,
    })
  }, 1000)

  const debouncedAutocomplete = useDebouncedCallback((query) => {
    autocomplete({
      query,
    })
  }, 300)

  const handleSearch = (newValue) => {
    if (queryRef.current.length < 2 && newValue.length < 2) return

    queryRef.current = newValue

    debouncedTranslate(newValue)
    debouncedAutocomplete(newValue)
  }

  const handleResetError = () => {
    clearState()
  }

  React.useEffect(() => {
    getData()
  }, [])

  const isEmptyTranslationData = !translationData
  const isEmptyTranslationHistory = !(
    translationHistory?.length && translationHistory.find(({ results }) => results.length)
  )

  const isEmpty = isEmptyTranslationData && isEmptyTranslationHistory

  const isLoading = (!translationHistory?.length && getStatusLoading) || translateLoading

  return (
    <div className="Popup">
      <PopupHeader className="Popup-header" />

      <div className="Popup-container">
        <PopupSearch
          className="Popup-search"
          suggestions={autoCompleteData}
          onChange={handleSearch}
        />

        {showTrainingSlider && (
          <TrainingSlider {...getCollapseProps()} toggleProps={getToggleProps()} />
        )}

        {isEmpty && !isLoading && (
          <div className="Popup-empty">Вбейте слово в поиск, чтобы увидеть его перевод</div>
        )}

        {isLoading && <Loader className="Popup-loader" />}

        {!isLoading && (
          <div className="Popup-cards">
            <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleResetError}>
              {translationData?.searchPhrase && (
                <div className="Popup-cards-item">
                  <TranslationListTitle className="Popup-cards-title">
                    {translationData?.results?.length ? 'Результат поиска' : 'Ничего не найдено'}
                  </TranslationListTitle>

                  <div className="Popup-cards-list">
                    {translationData?.results?.map(renderTranslationCard)}
                  </div>
                </div>
              )}
            </ErrorBoundary>

            <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleResetError}>
              {!isEmptyTranslationHistory && (
                <div className="Popup-cards-item">
                  <TranslationListTitle className="Popup-cards-title">
                    Недавно просмотренные
                  </TranslationListTitle>

                  <div className="Popup-cards-list">
                    <div className="Popup-cards-list">
                      {translationHistory?.map(renderHistoryCard)}
                    </div>
                  </div>
                </div>
              )}
            </ErrorBoundary>
          </div>
        )}
      </div>
    </div>
  )
}

export default React.memo(Popup)
