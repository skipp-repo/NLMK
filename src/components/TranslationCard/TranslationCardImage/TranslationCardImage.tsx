import React from 'react'
import clsx from 'clsx'
import './TranslationCardImage.scss'
import placeholder from '../../../assets/img/picture.jpg'

export type TranslationCardImageProps = JSX.IntrinsicElements['img'] & {}

const TranslationCardImage: React.FC<TranslationCardImageProps> = ({
  children,
  src,
  className,
  ...props
}) => {
  if (src) {
    return <img className={clsx('TranslationCardImage', className)} src={src} alt="" />
  }

  return <img className={clsx('TranslationCardImage', className)} src={placeholder} alt="" />
}

export default React.memo(TranslationCardImage)
