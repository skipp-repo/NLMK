import React from 'react'
import clsx from 'clsx'
import './BookmarkButton.css'
import { ReactComponent as BookmarkIconActive } from '../../assets/icons/bookmark2.svg'
import { ReactComponent as BookmarkIconOutline } from '../../assets/icons/bookmark2-outline.svg'

export type BookmarkButtonProps = JSX.IntrinsicElements['div'] & {
  active?: boolean
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  children,
  active = false,
  className,
  ...props
}) => {
  return (
    <div {...props} className={clsx('BookmarkButton', className)}>
      {active && <BookmarkIconActive />}
      {!active && <BookmarkIconOutline />}
    </div>
  )
}

export default React.memo(BookmarkButton)
