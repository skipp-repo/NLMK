import React from 'react'
import useTitle from 'react-use/lib/useTitle'

import { useSelector } from 'react-redux'
import Container from '../../components/Container/Container'
import PageTitle from '../../components/PageTitle/PageTitle'
import DownloadLink from '../../components/DownloadLink/DownloadLink'
import Button from '../../components/Button/Button'
import Tabs from '../../components/Tabs/Tabs'
import './MyVocabulary.scss'
import useReduxAction from '../../hooks/useReduxAction'
import * as vocabsSlices from '../../redux/slices/vocabs'
import * as vocabsSlice from '../../redux/slices/vocabs'

export type MyVocabularyProps = {}

const title = 'Мой словарь'

const MyVocabulary: React.FC<MyVocabularyProps> = ({ children }) => {
  const reduxAction = useReduxAction()

  const vocabs = useSelector(vocabsSlice.selectors.vocabsList)

  const getVocabs = reduxAction(vocabsSlices.getVocabs)

  const tabs = vocabs.map(({ _id, name }) => ({
    name: name || 'default',
    id: _id,
  }))

  const handleTabChange = (id) => {}

  const handleTabRename = (id) => {
    console.log('rename')
  }

  const handleTabDelete = (id) => {
    console.log('delete')
  }

  useTitle(title)

  React.useEffect(() => {
    getVocabs()
  }, [])

  return (
    <div className="MyVocabulary">
      <Container className="MyVocabulary-header">
        <PageTitle className="MyVocabulary-title">{title}</PageTitle>

        <DownloadLink>Скачать все слова</DownloadLink>

        <Button className="MyVocabulary-button">СОЗДАТЬ ГРУППУ</Button>
      </Container>
      <Container className="MyVocabulary-tabs">
        <Tabs
          tabs={tabs}
          onChange={handleTabChange}
          onDelete={handleTabDelete}
          onRename={handleTabRename}
        />
      </Container>
    </div>
  )
}

export default React.memo(MyVocabulary)
