import React from 'react'
import clsx from 'clsx'
import './PopupHeader.css'
import logo from '../../assets/img/icon-128.png'
import { ReactComponent as Bookmark } from '../../assets/icons/bookmark.svg'
import { ReactComponent as File } from '../../assets/icons/file.svg'

export type PopupHeaderProps = JSX.IntrinsicElements['div'] & {}

const PopupHeader: React.FC<PopupHeaderProps> = ({ children, className, ...props }) => {
  return (
    <div {...props} className={clsx('PopupHeader', className)}>
      <img src={logo} alt=""  className="PopupHeader-logo"/>

      <div className="PopupHeader-buttons">
        <a href="./main.html#/vocabulary" className="PopupHeader-button" target="_blank">
          <Bookmark />
        </a>
        <a href="./main.html#/documents" className="PopupHeader-button" target="_blank">
          <File />
        </a>
      </div>
    </div>
  )
}

export default React.memo(PopupHeader)
