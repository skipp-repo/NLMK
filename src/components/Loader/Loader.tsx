import React from 'react'
import clsx from 'clsx'
import './Loader.css'
import { ReactComponent as LoaderIcon } from '../../assets/icons/loader.svg'

export type LoaderProps = JSX.IntrinsicElements['div'] & {}

const Loader: React.FC<LoaderProps> = ({ children, className, ...props }) => {
  return (
    <div {...props} className={clsx('Loader', className)}>
      <LoaderIcon className="Loader-icon" />
    </div>
  )
}

export default React.memo(Loader)
