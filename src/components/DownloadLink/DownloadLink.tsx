import React from 'react'
import clsx from 'clsx'
import './DownloadLink.scss'
import { ReactComponent as DownloadIcon } from '../../assets/icons/down-arrow.svg'

export type DownloadLinkProps = JSX.IntrinsicElements['button'] & {
  children: string
}

const DownloadLink: React.FC<DownloadLinkProps> = ({ children, className, ...props }) => {
  return (
    <button {...props} className={clsx('DownloadLink', className)}>
      <DownloadIcon className="DownloadLink-icon" />
      <span className="DownloadLink-text">{children}</span>
    </button>
  )
}

export default React.memo(DownloadLink)
