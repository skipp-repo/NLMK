import React from 'react'
import useTitle from 'react-use/lib/useTitle'
import proschet from 'proschet'
import { useSelector } from 'react-redux'
import Container from '../../components/Container/Container'
import PageTitle from '../../components/PageTitle/PageTitle'
import DownloadLink from '../../components/DownloadLink/DownloadLink'
import Button from '../../components/Button/Button'
import Tabs from '../../components/Tabs/Tabs'
import ItemsCount from '../../components/ItemsCount/ItemsCount'
import TranslationCard from '../../components/TranslationCard/TranslationCard/TranslationCard'
import TranslationCardSelectable from '../../components/TranslationCard/TranslationCardSelectable/TranslationCardSelectable'
import './MyVocabulary.scss'
import useReduxAction from '../../hooks/useReduxAction'
import * as userSlice from '../../redux/slices/user'
import * as vocabsSlices from '../../redux/slices/vocabs'
import * as vocabsSlice from '../../redux/slices/vocabs'

export type MyVocabularyProps = {}

const title = 'Мой словарь'

const words = proschet(['слово', 'слова', 'слов'])

const MyVocabulary: React.FC<MyVocabularyProps> = () => {
  const reduxAction = useReduxAction()

  const vocabs = useSelector(vocabsSlice.selectors.vocabsList)

  const getVocabs = reduxAction(vocabsSlices.getVocabs)
  const getStatus = reduxAction(userSlice.getStatus)
  const createFolder = reduxAction(vocabsSlices.createFolder)

  const tabs = vocabs.map(({ _id, name }) => ({
    name: name || 'default',
    id: _id,
  }))

  const [activeTab, setActiveTab] = React.useState()

  const vocabsByID = useSelector(vocabsSlices.selectors.vocabById(activeTab))

  const renderCard = (data) => {
    return (
      <TranslationCardSelectable
        className={'MyVocabulary-card'}
        item={data}
        speech
        onSpeech={handleSpeech}
      />
    )
  }

  const handleSpeech = () => {}

  const handleTabChange = (id) => setActiveTab(id)

  const handleTabRename = (id) => {
    console.log('rename')
  }

  const handleTabDelete = (id) => {
    console.log('delete')
  }

  useTitle(title)

  React.useEffect(() => {
    getVocabs()
    getStatus()

    // createFolder({
    //   name: 'Тестовый список 2',
    //   cardsToAdd: [8069, 8072, 1596, 1987, 1595, 1723, 8074, 8076, 8078, 2076],
    // })
  }, [])

  React.useEffect(() => {
    if (vocabs?.length) {
      setActiveTab(vocabs[0]._id)
    }
  }, [vocabs])

  console.log(vocabsByID?.cards)

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
      {vocabsByID?.cards?.length !== undefined && (
        <Container className="MyVocabulary-actions">
          <ItemsCount>{`${vocabsByID?.cards.length} ${words(
            vocabsByID?.cards.length,
          )}`}</ItemsCount>
        </Container>
      )}

      {!!vocabsByID?.cards?.length && (
        <Container className="MyVocabulary-cards">{vocabsByID.cards.map(renderCard)}</Container>
      )}
    </div>
  )
}

export default React.memo(MyVocabulary)
