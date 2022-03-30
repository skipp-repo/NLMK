import React from 'react'
import clsx from 'clsx'
import './Header.scss'
import logo from '../../assets/img/icon-128.png'
import Container from '../Container/Container'
import HeaderLink from './HeaderLink'

export type HeaderProps = JSX.IntrinsicElements['div'] & {}

const Header: React.FC<HeaderProps> = ({ children, className, ...props }) => {
  return (
    <div {...props} className={clsx('Header', className)}>
      <Container className="Header-container">
        <img src={logo} alt=""  className="Header-logo" />

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
