import React from 'react'
import clsx from 'clsx'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import './TrainingSlider.css'
import { GetTogglePropsOutput } from 'react-collapsed/dist/types'
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg'
import { ReactComponent as SliderArrow } from '../../assets/icons/slider-arrow.svg'
import { ReactComponent as Cursor } from '../../assets/icons/cursor.svg'
import TranslationCardWord from '../TranslationCard/TranslationCardWord/TranslationCardWord'
import TranslationCardMeaning from '../TranslationCard/TranslationCardMeaning/TranslationCardMeaning'
import BookmarkButton from '../BookmarkButton/BookmarkButton'

export type TrainingSliderProps = JSX.IntrinsicElements['div'] & {
  onClose(): void
  toggleProps: GetTogglePropsOutput
}

const TrainingSlider: React.FC<TrainingSliderProps> = ({ className, toggleProps, ...props }) => {
  const slide1 = React.useMemo(
    () => (
      <Slide index={1}>
        <div className="TrainingSlider-slide">
          <div className="TrainingSlider-selected-text">
            a lot of money
            <Cursor className="TrainingSlider-cursor" />
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
      <Slide index={1}>
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
              <Cursor className="TrainingSlider-cursor" />
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
      <Slide index={1}>
        <div className="TrainingSlider-slide">
          <div className="TrainingSlider-selected-text TrainingSlider-selected-text-small">
            Turn off your devices
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
    <div {...props} className={clsx('TrainingSlider', className)}>
      <div className="TrainingSlider-close" {...toggleProps}>
        <CloseIcon />
      </div>
      <CarouselProvider naturalSlideWidth={270} naturalSlideHeight={56} totalSlides={3}>
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
      </CarouselProvider>
    </div>
  )
}

export default React.memo(TrainingSlider)
