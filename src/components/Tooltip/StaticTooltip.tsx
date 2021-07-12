import React from 'react'
import clsx from 'clsx'
import './Tooltip.css'
import BookmarkButton from '../BookmarkButton/BookmarkButton'

export type TooltipProps = JSX.IntrinsicElements['div'] & {
  isBookmark?: boolean
}

const Tooltip: React.FC<TooltipProps> = ({ children, isBookmark, className, ...props }) => {
  return (
    <div {...props} className={clsx('NLMK-Extension-Tooltip', className)}>
      <div className="NLMK-Extension-Tooltip-text">{children}</div>
      {isBookmark && (
        <BookmarkButton
          className="NLMK-Extension-Tooltip-bookmark"
          active
          iconProps={{ width: 11, height: 14 }}
        />
      )}
    </div>
  )
}
export default React.memo(Tooltip)
