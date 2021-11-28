import React from 'react'
import { Link } from 'wouter'
import clsx from 'clsx'
import './BackLink.scss'
import { ReactComponent as ArrowIcon } from '../../assets/icons/back-arrow.svg'

export type BackLinkProps = JSX.IntrinsicElements['div'] & {
  href: string
  children: string
  onClick(): void
}

const BackLink: React.FC<BackLinkProps> = ({ children, href, className, onClick, ...props }) => {
  return (
    <Link href={href} onClick={onClick}>
      <div {...props} className={clsx('BackLink', className)}>
        <ArrowIcon className="BackLink-icon" />
        <span className="BackLink-text">{children}</span>
      </div>
    </Link>
  )
}

export default React.memo(BackLink)
