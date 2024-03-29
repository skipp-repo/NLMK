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
import { SpaceEnum } from '../../redux/slices/translation'
import * as autocompleteSlice from '../../redux/slices/autocomplete'
import * as appSlice from '../../redux/slices/app'
import * as vocabsSlice from '../../redux/slices/vocabs'
import useDebouncedTranslate from '../../hooks/useDebouncedTranslate'
import { DEBOUNCE_AUTOCOMPLETE_TIME } from '../../constantes'
import { EditVocabFolder } from '../../api/requests/editVocabFolder'
import useStatus from '../../hooks/useStatus'

const Popup = () => {
  useStatus()

  const reduxAction = useReduxAction()

  const [queryString, setQueryString] = React.useState('')

  const translationData = useSelector(translationSlice.selectors.popupSearchResults)
  const { translateLoading } = useSelector(translationSlice.selectors.translationFlags)
  const autoCompleteData = useSelector(autocompleteSlice.selectors.autocompleteByQuery(queryString))
  const translationHistory = useSelector(userSlice.selectors.history)
  const { getStatusLoading } = useSelector(userSlice.selectors.flags)
  const showTrainingSlider = useSelector(appSlice.selectors.showTrainingSlider)

  const getData = reduxAction(appSlice.getData)
  const autocomplete = reduxAction(autocompleteSlice.autocomplete)
  const hideTrainingSlider = reduxAction(appSlice.hideTrainingSlider)
  const clearState = reduxAction(userSlice.clearUserState)
  const addToBookmarks = reduxAction(({ cardsToAdd }: Omit<EditVocabFolder, 'id'>) =>
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

  const renderTranslationCard = (data, index) => {
    return (
      <TranslationCard
        key={`translation-${index}`}
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
      return results?.map((data, index) => {
        return (
          <TranslationCard
            key={`history-${index}`}
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

  const debouncedTranslate = useDebouncedTranslate(SpaceEnum.Popup)

  const debouncedAutocomplete = useDebouncedCallback((query) => {
    autocomplete({
      query,
    })
  }, DEBOUNCE_AUTOCOMPLETE_TIME)

  const handleSearch = (newValue) => {
    if (queryString.length < 2 && newValue.length < 2) return

    setQueryString(newValue)

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
    translationHistory?.length && translationHistory.find(({ results }) => results?.length)
  )

  const isEmpty = isEmptyTranslationData && isEmptyTranslationHistory

  const isLoading = (!translationHistory?.length && getStatusLoading) || translateLoading

  const isSearching = !!queryString.length && !!translationData?.searchPhrase

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
              {isSearching && (
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
