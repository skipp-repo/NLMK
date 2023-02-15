import React from 'react'
import clsx from 'clsx'
import './Loader.css'
import { ReactComponent as LoaderIcon } from '../../assets/icons/loader.svg'

export type LoaderProps = JSX.IntrinsicElements['div'] & { size?: number }

const Loader: React.FC<LoaderProps> = ({ size = 30, children, className, ...props }) => {
  return (
    <div {...props} className={clsx('Loader', className)}>
      <div className="loader-iconWrapper">
        <LoaderIcon className="Loader-icon" height={size} width={size} />
      </div>
    </div>
  )
}

export default React.memo(Loader)
