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
import * as appSlice from '../../redux/slices/app'

const Popup = () => {
  const reduxAction = useReduxAction()

  const translationData = useSelector(translationSlice.selectors.popupSearchResults)
  const { translateLoading } = useSelector(translationSlice.selectors.translationFlags)
  const translationHistory = useSelector(userSlice.selectors.history)
  const { getStatusLoading } = useSelector(userSlice.selectors.flags)
  const showTrainingSlider = useSelector(appSlice.selectors.showTrainingSlider)

  const getStatus = reduxAction(userSlice.getStatus)
  const translate = reduxAction(translationSlice.translate)
  const hideTrainingSlider = reduxAction(appSlice.hideTrainingSlider)

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

  const handleSearch = useDebouncedCallback(({ target }) => {
    translate({
      query: target.value,
    })
  }, 1000)

  React.useEffect(() => {
    getStatus()
  }, [])

  const isLoading = translateLoading || getStatusLoading

  const isEmpty = !translationData?.results?.length && !translationHistory?.length

  return (
    <div className="Popup">
      <PopupHeader className="Popup-header" />

      <div className="Popup-container">
        <PopupSearch className="Popup-search" onChange={handleSearch} />

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
