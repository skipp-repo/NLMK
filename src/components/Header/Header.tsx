import React from 'react'
import clsx from 'clsx'
import './Header.scss'
import { ReactComponent as Logo } from '../../assets/icons/main-logo.svg'
import Container from '../Container/Container'
import HeaderLink from './HeaderLink'

export type HeaderProps = JSX.IntrinsicElements['div'] & {}

const Header: React.FC<HeaderProps> = ({ children, className, ...props }) => {
  return (
    <div {...props} className={clsx('Header', className)}>
      <Container className="Header-container">
        <Logo className="Header-logo" />

        <div className="Header-nav">
          <HeaderLink href="/vocabulary">Мой словарь</HeaderLink>

          <HeaderLink href="/glossaries">Глоссарии НЛМК</HeaderLink>

          <HeaderLink href="/documents">Мои документы</HeaderLink>
        </div>
      </Container>
    </div>
  )
}

export default React.memo(Header)
