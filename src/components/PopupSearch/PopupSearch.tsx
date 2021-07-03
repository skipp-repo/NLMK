import React from 'react'
import clsx from 'clsx'
import './PopupSearch.css'
// @ts-ignore
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg'

export type PopupSearchProps = JSX.IntrinsicElements['input'] & {}

const PopupSearch: React.FC<PopupSearchProps> = ({ children, className, ...props }) => {
  return (
    <div className={clsx('PopupSearch', className)}>
      <input
        type="text"
        placeholder="Перевести слово или фразу..."
        className="PopupSearch-input"
        {...props}
      />
      <SearchIcon className="PopupSearch-icon" />
    </div>
  )
}

export default React.memo(PopupSearch)
