import React from 'react'
import clsx from 'clsx'
import './PopupHeader.css'
// @ts-ignore
import { ReactComponent as Logo } from '../../assets/icons/logo.svg'
// @ts-ignore
import { ReactComponent as Bookmark } from '../../assets/icons/bookmark.svg'
// @ts-ignore
import { ReactComponent as File } from '../../assets/icons/file.svg'

export type PopupHeaderProps = JSX.IntrinsicElements['div'] & {}

const PopupHeader: React.FC<PopupHeaderProps> = ({ children, className, ...props }) => {
  return (
    <div {...props} className={clsx('PopupHeader', className)}>
      <div className="PopupHeader-logo">
        <Logo />
      </div>
      <div className="PopupHeader-buttons">
        <a href="./main.html#vocabulary" className="PopupHeader-button" target="_blank">
          <Bookmark />
        </a>
        <a href="./main.html#documents" className="PopupHeader-button" target="_blank">
          <File />
        </a>
      </div>
    </div>
  )
}

export default React.memo(PopupHeader)
