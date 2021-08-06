import React from 'react'
import clsx from 'clsx'
import { Link, useRoute } from 'wouter'

export type HeaderLinkProps = JSX.IntrinsicElements['a'] & {
  href: string
  children: string
}

const HeaderLink: React.FC<HeaderLinkProps> = ({ href, children, className, ...props }) => {
  const [isActive] = useRoute(href)

  return (
    <Link href={href}>
      <a className={clsx('Header-link', isActive && 'Header-link_active')} {...props}>
        {children}
      </a>
    </Link>
  )
}

export default React.memo(HeaderLink)
