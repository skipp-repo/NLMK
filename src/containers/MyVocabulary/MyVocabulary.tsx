import React from 'react'
import useTitle from 'react-use/lib/useTitle'
import { useSelector } from 'react-redux'
import { useDebouncedCallback } from 'use-debounce'
import Container from '../../components/Container/Container'
import PageTitle from '../../components/PageTitle/PageTitle'
import DownloadLink from '../../components/DownloadLink/DownloadLink'
import Button from '../../components/Button/Button'
import Tabs from '../../components/Tabs/Tabs'
import TranslationCardSelectable from '../../components/TranslationCard/TranslationCardSelectable/TranslationCardSelectable'
import './MyVocabulary.scss'
import useModal from '../../hooks/useModal'
import useReduxAction from '../../hooks/useReduxAction'
import * as vocabsSlices from '../../redux/slices/vocabs'
import * as vocabsSlice from '../../redux/slices/vocabs'
import * as appSlice from '../../redux/slices/app'
import MyVocabularyActions from './MyVocabularyActions'
import Search from '../../components/Search/Search'
import VocabsFilters from '../../components/VocabsFilters/VocabsFilters'
import ModalNewVocabGroup from '../../components/ModalNewVocabGroup/ModalNewVocabGroup'
import ModalRemoveVocabGroup from '../../components/ModalRemoveVocabGroup/ModalRemoveVocabGroup'
import ModalRenameVocabGroup from '../../components/ModalRenameVocabGroup/ModalRenameVocabGroup'
import * as translationSlice from '../../redux/slices/translation'
import { Translate } from '../../redux/slices/translation'

export type MyVocabularyProps = {}

const title = 'Мой словарь'

const searchFiltersState = {
  vocabs: true,
  phrases: false,
  words: false,
}

const searchFiltersReducer = (state, action) => {
  switch (action.key) {
    case 'WordsAndPhrases':
      return { ...state, words: true, phrases: true }
    case 'Words':
      return { ...state, words: true, phrases: false }
    case 'Phrases':
      return { ...state, words: false, phrases: true }
    default:
      return state
  }
}

const MyVocabulary: React.FC<MyVocabularyProps> = () => {
  const reduxAction = useReduxAction()

  const [query, setQuery] = React.useState('')
  const [activeTab, setActiveTab] = React.useState()
  const [searchFilters, searchFiltersDispatch] = React.useReducer(
    searchFiltersReducer,
    searchFiltersState,
  )

  const vocabsByID = useSelector(vocabsSlices.selectors.vocabById(activeTab))
  const vocabs = useSelector(vocabsSlice.selectors.vocabsList)

  const [newGroupPopupVisible, showNewGroupPopup, hideNewGroupPopup] = useModal()
  const [
    removeGroupModalVisible,
    showRemoveGroupModal,
    hideRemoveGroupModal,
    removeId,
    setIdForRemoveGroupModal,
  ] = useModal()
  const [
    renameGroupModalVisible,
    showRenameGroupModal,
    hideRenameGroupModal,
    renameData,
    setDataRenameGroupModal,
  ] = useModal()

  const createFolder = reduxAction(vocabsSlices.createFolder)
  const removeFolder = reduxAction(vocabsSlices.removeFolder)
  const editFolder = reduxAction(vocabsSlices.editFolder)
  const selectCard = reduxAction(vocabsSlice.selectCard)
  const getData = reduxAction(appSlice.getData)
  const search = reduxAction((params: Omit<Translate, 'space'>) =>
    translationSlice.translate({ space: 'MainVocabs', ...params }),
  )
  const debouncedSearch = useDebouncedCallback(search, 300)

  const searchData = useSelector(translationSlice.selectors.mainVocabsSearchResults)

  const needShowSearchResults = !!searchData?.results?.length && query.length > 2

  const vocabFilterList = React.useMemo(
    () =>
      vocabs.map(({ _id, name, ...item }) => ({
        key: 'Vocab',
        value: { id: _id, selected: false },
        name: item.default ? 'Default' : name,
      })),
    [vocabs],
  )

  const filters = [
    {
      name: 'Тип поиска',
      items: [
        {
          key: 'WordsAndPhrases',
          name: 'Слова и фразы',
          value: {
            phrases: true,
            words: true,
          },
        },
        {
          key: 'Words',
          name: 'Только слова',
          value: {
            words: true,
          },
        },
        {
          key: 'Phrases',
          name: 'Только фразы',
          value: {
            phrases: true,
          },
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

  const handleCardSelect = (cardId: number, selected: boolean) => {
    selectCard({ vocabId: activeTab, cardId, selected })
  }

  const renderCard = (data) => {
    return (
      <TranslationCardSelectable
        key={data._id}
        className={'MyVocabulary-card'}
        item={data}
        speech
        onSpeech={handleSpeech}
        onSelect={handleCardSelect}
      />
    )
  }

  const handleSpeech = () => {}

  const handleTabChange = (id) => setActiveTab(id)

  const handleTabRename = ({ id, name }) => {
    setDataRenameGroupModal({ id, name })

    showRenameGroupModal()
  }

  const handleTabRemove = (id) => {
    setIdForRemoveGroupModal(id)
    showRemoveGroupModal()
  }

  const handleGroupRemove = () => {
    removeFolder({ id: removeId })
    hideRemoveGroupModal()
  }

  const handleSearch = (text) => {
    if (query.length < 2 && text.length < 2) return

    setQuery(text)

    debouncedSearch({
      query: text,
      filters: {
        common: false,
        ...searchFilters,
      },
    })
  }

  const handleCreateNewGroup = (name) => {
    createFolder({ name })
    hideNewGroupPopup()
  }

  const handleRenameGroup = (name) => {
    editFolder({
      id: renameData?.id,
      name: name,
    })
    hideRenameGroupModal()
  }

  const handleChangeFilter = ({ key, value }) => {
    console.log(key, value)
    searchFiltersDispatch({ key, value })
  }

  useTitle(title)

  React.useEffect(() => {
    getData()
  }, [])

  React.useEffect(() => {
    if (vocabs?.length && !activeTab) {
      setActiveTab(vocabs[0]._id)
    }
  }, [vocabs])

  return (
    <div className="MyVocabulary">
      <Container className="MyVocabulary-header">
        <PageTitle className="MyVocabulary-title">{title}</PageTitle>

        <DownloadLink>Скачать все слова</DownloadLink>

        <Button className="MyVocabulary-button" onClick={showNewGroupPopup}>
          СОЗДАТЬ ГРУППУ
        </Button>
      </Container>
      <Container className="MyVocabulary-tabs">
        <Tabs
          tabs={tabs}
          onChange={handleTabChange}
          onDelete={handleTabRemove}
          onRename={handleTabRename}
        />
      </Container>

      {vocabsByID?.cards?.length !== undefined && <MyVocabularyActions activeTab={activeTab} />}

      <Container className="MyVocabulary-search">
        <Search className="MyVocabulary-search-input" onChange={handleSearch} suggestions={[]} />

        <VocabsFilters
          className="MyVocabulary-search-filter"
          items={filters}
          onSelect={handleChangeFilter}
        />
      </Container>

      {!!vocabsByID?.cards?.length && !needShowSearchResults && (
        <Container className="MyVocabulary-cards">{vocabsByID.cards.map(renderCard)}</Container>
      )}

      {needShowSearchResults && (
        <Container className="MyVocabulary-cards">{searchData.results.map(renderCard)}</Container>
      )}

      <ModalNewVocabGroup
        visible={newGroupPopupVisible}
        onCreate={handleCreateNewGroup}
        onClose={hideNewGroupPopup}
      />

      <ModalRemoveVocabGroup
        visible={removeGroupModalVisible}
        onRemove={handleGroupRemove}
        onClose={hideRemoveGroupModal}
      />

      <ModalRenameVocabGroup
        visible={renameGroupModalVisible}
        name={renameData?.name}
        onClose={hideRenameGroupModal}
        onChange={handleRenameGroup}
      />
    </div>
  )
}

export default React.memo(MyVocabulary)
