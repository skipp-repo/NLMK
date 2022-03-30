import React, { SVGProps } from 'react'
import clsx from 'clsx'
import './BookmarkButton.css'
import { ReactComponent as BookmarkIconActive } from '../../assets/icons/bookmark2.svg'
import { ReactComponent as BookmarkIconOutline } from '../../assets/icons/bookmark2-outline.svg'

export type BookmarkButtonProps = JSX.IntrinsicElements['div'] & {
  active?: boolean
  iconProps?: SVGProps<any>
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  children,
  active = false,
  className,
  iconProps,
  ...props
}) => {
  return (
    <div {...props} className={clsx('Echo-Extension-Bookmark-Button', className)}>
      {active && <BookmarkIconActive {...iconProps} />}
      {!active && <BookmarkIconOutline {...iconProps} />}
      {children}
    </div>
  )
}

export default React.memo(BookmarkButton)
