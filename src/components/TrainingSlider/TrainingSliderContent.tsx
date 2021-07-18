import React from 'react'
import { Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import './TrainingSlider.scss'
import { ReactComponent as SliderArrow } from '../../assets/icons/slider-arrow.svg'
import { ReactComponent as Cursor } from '../../assets/icons/cursor.svg'
import TranslationCardWord from '../TranslationCard/TranslationCardWord/TranslationCardWord'
import TranslationCardMeaning from '../TranslationCard/TranslationCardMeaning/TranslationCardMeaning'
import BookmarkButton from '../BookmarkButton/BookmarkButton'
import Tooltip from '../Tooltip/StaticTooltip'

export type TrainingSliderContentProps = {}

const TrainingSliderContent: React.FC<TrainingSliderContentProps> = () => {
  const slide1 = React.useMemo(
    () => (
      <Slide index={1} key={1}>
        <div className="TrainingSlider-slide">
          <div className="TrainingSlider-selected-text">
            a lot of money
            <Cursor className="TrainingSlider-cursor-1" />
            <Tooltip className="TrainingSlider-tooltip-1">много денег</Tooltip>
          </div>

          <div className="TrainingSlider-text">
            Выделите текст на странице <br /> и появится перевод
          </div>
        </div>
      </Slide>
    ),
    [],
  )

  const slide2 = React.useMemo(
    () => (
      <Slide index={2} key={2}>
        <div className="TrainingSlider-slide">
          <div className="TrainingSlider-word-card">
            <div className="TrainingSlider-word-card-content">
              <TranslationCardWord
                className="TrainingSlider-word"
                input=""
                speech={false}
                onSpeech={undefined}
              >
                Work
              </TranslationCardWord>
              <TranslationCardMeaning>Работа</TranslationCardMeaning>
            </div>
            <BookmarkButton active className="TrainingSlider-bookmark">
              <Cursor className="TrainingSlider-cursor-2" />
            </BookmarkButton>
          </div>
          <div className="TrainingSlider-text">
            Добавляйте слова в словарь <br />и создавайте группы слов
          </div>
        </div>
      </Slide>
    ),
    [],
  )

  const slide3 = React.useMemo(
    () => (
      <Slide index={3} key={3}>
        <div className="TrainingSlider-slide">
          <div className="TrainingSlider-selected-text TrainingSlider-selected-text-small">
            Turn off your devices
            <Tooltip className="TrainingSlider-tooltip-3" isBookmark>
              Выключите свои
              <br />
              устройства
              <Cursor className="TrainingSlider-cursor-3" />
            </Tooltip>
          </div>
          <div className="TrainingSlider-text TrainingSlider-text_slide_3">
            Переводите в строке слова <br />и целые предложения
          </div>
        </div>
      </Slide>
    ),
    [],
  )

  return (
    <>
      <Slider className="TrainingSlider-slider">
        {slide1}
        {slide2}
        {slide3}
      </Slider>

      <div className="TrainingSlider-arrows">
        <ButtonBack className="TrainingSlider-back">
          <SliderArrow className="TrainingSlider-back-arrow" />
        </ButtonBack>
        <ButtonNext className="TrainingSlider-next">
          <SliderArrow className="TrainingSlider-next-arrow" />
        </ButtonNext>
      </div>
    </>
  )
}

export default React.memo(TrainingSliderContent)
