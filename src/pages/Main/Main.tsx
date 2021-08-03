import React from 'react'
import { Link } from 'wouter'
import MainRouter from '../../containers/MainRouter/MainRouter'
import './Main.scss'
import useReduxAction from '../../hooks/useReduxAction'
import * as vocabsSlices from '../../redux/slices/vocabs'

const Main = () => {
  const reduxAction = useReduxAction()

  const getVocabs = reduxAction(vocabsSlices.getVocabs)
  const getVocab = reduxAction(vocabsSlices.getVocab)

  React.useEffect(() => {
    getVocabs()

    getVocab({ id: 'default' })
  }, [])

  return (
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
  )
}

export default React.memo(Main)
