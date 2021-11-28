import React from 'react'
import MainRouter from '../../containers/MainRouter/MainRouter'
import Header from '../../components/Header/Header'
import './Main.scss'
import useReduxAction from '../../hooks/useReduxAction'
import * as vocabsSlices from '../../redux/slices/vocabs'

const Main = () => {
  const reduxAction = useReduxAction()

  const getVocabs = reduxAction(vocabsSlices.getVocabs)

  React.useEffect(() => {
    getVocabs()
  }, [])

  return (
    <div className="Main">
      <MainRouter>
        <Header />
      </MainRouter>
    </div>
  )
}

export default React.memo(Main)
