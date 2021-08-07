import React from 'react'
import clsx from 'clsx'
import './PageTitle.scss'

export type PageTitleProps = JSX.IntrinsicElements['div'] & {
  children: string
}

const PageTitle: React.FC<PageTitleProps> = ({ children, className, ...props }) => {
  return (
    <div {...props} className={clsx('PageTitle', className)}>
      {children}
    </div>
  )
}

export default React.memo(PageTitle)
