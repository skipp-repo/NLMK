import React from 'react'
import { useSelector } from 'react-redux'
import useCollapse from 'react-collapsed'
import { useDebouncedCallback } from 'use-debounce'
import './Popup.scss'
import PopupHeader from '../../containers/PopupHeader/PopupHeader'
import PopupSearch from '../../components/PopupSearch/PopupSearch'
import TranslationCard from '../../components/TranslationCard/TranslationCard'
import Loader from '../../components/Loader/Loader'
import TrainingSlider from '../../components/TrainingSlider/TrainingSlider'
import useReduxAction from '../../hooks/useReduxAction'
import * as userSlice from '../../redux/slices/user'
import * as translationSlice from '../../redux/slices/translation'
import * as autocompleteSlice from '../../redux/slices/autocomplete'
import * as appSlice from '../../redux/slices/app'

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
  const installDate = useSelector(appSlice.selectors.installDate)

  const getStatus = reduxAction(userSlice.getStatus)
  const translate = reduxAction(translationSlice.translate)
  const autocomplete = reduxAction(autocompleteSlice.autocomplete)
  const hideTrainingSlider = reduxAction(appSlice.hideTrainingSlider)
  const setInstallDate = reduxAction(appSlice.setInstallDate)

  const handleOpenMain = () => window.open('main.html')

  const { getCollapseProps, getToggleProps } = useCollapse({
    defaultExpanded: true,
    // onCollapseEnd: hideTrainingSlider,
    onCollapseStart: hideTrainingSlider,
  })

  const handleSpeech = () => {}

  const renderTranslationCard = ({
    translation: {
      translation,
      image,
      glossaries,
      // inBookmarks,
      text,
      _id,
    },
  }) => {
    return (
      <TranslationCard
        key={_id}
        className="Popup-cards-list-item"
        input={translationData?.searchPhrase}
        word={text}
        translation={translation}
        image={image}
        glossaries={glossaries}
        // inBookmarks={inBookmarks}
        onSpeech={handleSpeech}
        speech
      />
    )
  }

  const renderHistoryCard = React.useCallback(
    ({ results, request: { q } }) => {
      return results?.map(
        ({
          translation: {
            translation,
            image,
            glossaries,
            // inBookmarks,
            text,
            _id,
          },
        }) => {
          return (
            <TranslationCard
              key={_id}
              className="Popup-cards-list-item"
              input={q}
              word={text}
              translation={translation}
              image={image}
              glossaries={glossaries}
              // inBookmarks={inBookmarks}
              onSpeech={handleSpeech}
              speech
            />
          )
        },
      )
    },
    [translationHistory],
  )

  const debouncedTranslate = useDebouncedCallback((query) => {
    translate({
      query,
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

  React.useEffect(() => {
    getStatus()
  }, [])

  React.useEffect(() => {
    if (!installDate) {
      setInstallDate()
    }
  }, [installDate])

  const isLoading = translateLoading || getStatusLoading

  const isEmpty = !translationData?.results?.length && !translationHistory?.length

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

        {isEmpty && (
          <div className="Popup-empty">Вбейте слово в поиск, чтобы увидеть его перевод</div>
        )}

        {isLoading && <Loader />}

        {!isLoading && (
          <div className="Popup-cards">
            {!!translationData?.results?.length && (
              <div className="Popup-cards-item">
                <div className="Popup-cards-title">Результат поиска</div>

                <div className="Popup-cards-list">
                  {translationData?.results?.map(renderTranslationCard)}
                </div>
              </div>
            )}

            {!!translationHistory?.length && (
              <div className="Popup-cards-item">
                <div className="Popup-cards-title">Недавно просмотренные</div>

                <div className="Popup-cards-list">
                  <div className="Popup-cards-list">
                    {translationHistory?.map(renderHistoryCard)}
                  </div>{' '}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default React.memo(Popup)
