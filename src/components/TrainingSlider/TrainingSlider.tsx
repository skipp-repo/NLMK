import React from 'react'
import clsx from 'clsx'
import { CarouselProvider } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import './TrainingSlider.css'
import { GetTogglePropsOutput } from 'react-collapsed/dist/types'
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg'
import TrainingSliderContent from './TrainingSliderContent'

export type TrainingSliderProps = JSX.IntrinsicElements['div'] & {
  toggleProps: GetTogglePropsOutput
}

const TrainingSlider: React.FC<TrainingSliderProps> = ({
  className,
  toggleProps,
  children,
  ...props
}) => {
  return (
    <div {...props} className={clsx('TrainingSlider', className)}>
      <div className="TrainingSlider-close" {...toggleProps}>
        <CloseIcon />
      </div>
      <CarouselProvider naturalSlideWidth={270} naturalSlideHeight={56} totalSlides={3}>
        <TrainingSliderContent />
      </CarouselProvider>
    </div>
  )
}

export default React.memo(TrainingSlider)
