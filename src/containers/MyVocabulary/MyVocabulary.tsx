import React from 'react'
import useTitle from 'react-use/lib/useTitle'
import { useSelector } from 'react-redux'
import Container from '../../components/Container/Container'
import PageTitle from '../../components/PageTitle/PageTitle'
import DownloadLink from '../../components/DownloadLink/DownloadLink'
import Button from '../../components/Button/Button'
import Tabs from '../../components/Tabs/Tabs'
import TranslationCardSelectable from '../../components/TranslationCard/TranslationCardSelectable/TranslationCardSelectable'
import './MyVocabulary.scss'
import useReduxAction from '../../hooks/useReduxAction'
import * as autocompleteSlice from '../../redux/slices/autocomplete'
import * as userSlice from '../../redux/slices/user'
import * as vocabsSlices from '../../redux/slices/vocabs'
import * as vocabsSlice from '../../redux/slices/vocabs'
import MyVocabularyActions from './MyVocabularyActions'
import Search from '../../components/Search/Search'
import VocabsFilters from '../../components/VocabsFilters/VocabsFilters'

export type MyVocabularyProps = {}

const title = 'Мой словарь'

const MyVocabulary: React.FC<MyVocabularyProps> = () => {
  const reduxAction = useReduxAction()

  const queryRef = React.useRef('')

  const vocabs = useSelector(vocabsSlice.selectors.vocabsList)
  const autoCompleteData = useSelector(
    autocompleteSlice.selectors.autocompleteByQuery(queryRef.current),
  )

  const getVocabs = reduxAction(vocabsSlices.getVocabs)
  const getStatus = reduxAction(userSlice.getStatus)
  const createFolder = reduxAction(vocabsSlices.createFolder)

  const vocabFilterList = React.useMemo(
    () =>
      vocabs.map(({ _id, name, ...item }) => ({ key: _id, name: item.default ? 'Default' : name })),
    [vocabs],
  )

  const filters = [
    {
      name: 'Тип поиска',
      items: [
        {
          key: 'WordsAndPhrases',
          name: 'Слова и фразы',
        },
        {
          key: 'Words',
          name: 'Только слова',
        },
        {
          key: 'Phrases',
          name: 'Только фразы',
        },
      ],
    },
    {
      name: 'Глоссарий',
      items: vocabFilterList,
    },
  ]

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

  const handleSearch = (text) => {}

  useTitle(title)

  React.useEffect(() => {
    getVocabs()
    getStatus()

    // createFolder({
    //   name: 'Тестовый список',
    //   cardsToAdd: [8069, 8072, 1596, 1987, 1595, 1723, 8074, 8076, 8078, 2076],
    // })
  }, [])

  React.useEffect(() => {
    if (vocabs?.length) {
      setActiveTab(vocabs[0]._id)
    }
  }, [vocabs])

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

      {vocabsByID?.cards?.length !== undefined && <MyVocabularyActions activeTab={activeTab} />}

      <Container className="MyVocabulary-search">
        <Search
          className="MyVocabulary-search-input"
          onChange={handleSearch}
          suggestions={autoCompleteData}
        />

        <VocabsFilters className="MyVocabulary-search-filter" items={filters} />
      </Container>

      {!!vocabsByID?.cards?.length && (
        <Container className="MyVocabulary-cards">{vocabsByID.cards.map(renderCard)}</Container>
      )}
    </div>
  )
}

export default React.memo(MyVocabulary)
