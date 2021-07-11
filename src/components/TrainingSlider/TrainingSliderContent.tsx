import React from 'react'
import { Slider, Slide, ButtonBack, ButtonNext, CarouselContext } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import './TrainingSlider.css'
import { ReactComponent as SliderArrow } from '../../assets/icons/slider-arrow.svg'
import { ReactComponent as Cursor } from '../../assets/icons/cursor.svg'
import TranslationCardWord from '../TranslationCard/TranslationCardWord/TranslationCardWord'
import TranslationCardMeaning from '../TranslationCard/TranslationCardMeaning/TranslationCardMeaning'
import BookmarkButton from '../BookmarkButton/BookmarkButton'
import Tooltip from '../Tooltip/Tooltip'

export type TrainingSliderContentProps = JSX.IntrinsicElements['div'] & {}

const TrainingSliderContent: React.FC<TrainingSliderContentProps> = () => {
  const [referenceElement1, setReferenceElement1] = React.useState(null)
  const [referenceElement3, setReferenceElement3] = React.useState(null)
  const tooltip3Ref = React.useRef()
  const carouselContext = React.useContext(CarouselContext)

  const slide1 = React.useMemo(
    () => (
      <Slide index={1}>
        <div className="TrainingSlider-slide">
          <div className="TrainingSlider-selected-text" ref={setReferenceElement1}>
            a lot of money
            <Cursor className="TrainingSlider-cursor" />
          </div>

          <Tooltip referenceElement={referenceElement1} offset={[15, 5]} placement="bottom">
            много денег
          </Tooltip>
          <div className="TrainingSlider-text">
            Выделите текст на странице <br /> и появится перевод
          </div>
        </div>
      </Slide>
    ),
    [referenceElement1],
  )

  const slide2 = React.useMemo(
    () => (
      <Slide index={2}>
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
      <Slide index={3}>
        <div className="TrainingSlider-slide">
          <div
            className="TrainingSlider-selected-text TrainingSlider-selected-text-small"
            ref={setReferenceElement3}
          >
            Turn off your devices
          </div>
          <Tooltip
            referenceElement={referenceElement3}
            // offset={[0, 5]}
            placement="bottom"
            ref={tooltip3Ref}
          >
            Выключите свои
            <br /> устройства
          </Tooltip>
          <div className="TrainingSlider-text TrainingSlider-text_slide_3">
            Переводите в строке слова <br />и целые предложения
          </div>
        </div>
      </Slide>
    ),
    [referenceElement3],
  )

  const handleChange = () => {
    console.log('change')
  }

  React.useEffect(() => {
    const onChange = () => {
      console.log(carouselContext.state.currentSlide)

      if (carouselContext.state.currentSlide === 2) {
        // @ts-ignore
        tooltip3Ref.current.update()
      }
    }

    carouselContext.subscribe(onChange)

    return () => carouselContext.unsubscribe(onChange)
  }, [carouselContext])

  return (
    <>
      <Slider className="TrainingSlider-slider" onChange={handleChange}>
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
