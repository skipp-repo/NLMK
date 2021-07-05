import React from 'react'
import clsx from 'clsx'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel'
import './TrainingSlider.css'
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg'
import { ReactComponent as SliderArrow } from '../../assets/icons/slider-arrow.svg'

import 'pure-react-carousel/dist/react-carousel.es.css'

export type TrainingSliderProps = JSX.IntrinsicElements['div'] & {
  onClose(): void
}

const TrainingSlider: React.FC<TrainingSliderProps> = ({
  onClose = () => {},
  className,
  ...props
}) => {
  const swiperRef = React.useRef()

  console.log('debug123', swiperRef.current)

  return (
    <div {...props} className={clsx('TrainingSlider', className)}>
      <CloseIcon className="TrainingSlider-close" />
      <CarouselProvider naturalSlideWidth={100} naturalSlideHeight={76} totalSlides={3}>
        <Slider className="TrainingSlider-slider">
          <Slide index={0}>I am the first Slide.</Slide>
          <Slide index={1}>I am the second Slide.</Slide>
          <Slide index={2}>I am the third Slide.</Slide>
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
