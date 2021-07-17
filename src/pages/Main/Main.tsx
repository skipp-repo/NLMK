import React from 'react'
import { Link } from 'wouter'
import Provider from '../../containers/Provider/Provider'
import MainRouter from '../../containers/MainRouter/MainRouter'
import './Main.scss'

const Main = () => {
  return (
    <Provider>
      <MainRouter>
        <div className="App">Здесь будет список избранных слов, глоссарии, документы</div>

        <Link href="/vocabulary">
          <a className="link">Profile</a>
        </Link>

        <Link href="/glossaries">
          <a className="link">Profile</a>
        </Link>

        <Link href="/documents">
          <a className="link">Profile</a>
        </Link>
      </MainRouter>
    </Provider>
  )
}

export default React.memo(Main)
