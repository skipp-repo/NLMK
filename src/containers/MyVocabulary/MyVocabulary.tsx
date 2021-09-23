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

const searchFiltersReducer = (state, action) => {
  switch (action.type) {
    case 'WordsAndPhrases':
      return { ...state, words: action.selected, phrases: action.selected }
    case 'Words': {
      return { ...state, words: action.selected, phrases: false }
    }
    case 'Phrases':
      return { ...state, words: false, phrases: action.selected }
    case 'Vocab': {
      let vocabs = state.vocabs

      if (Array.isArray(vocabs)) {
        if (action.selected) {
          vocabs = [...vocabs, action.data.id]
        } else {
          vocabs = vocabs.filter((id) => id !== action.data.id)
        }
      } else {
        if (action.selected) {
          vocabs = [action.data.id]
        }
      }

      return { ...state, vocabs }
    }
    default:
      return state
  }
}

const MyVocabulary: React.FC<MyVocabularyProps> = () => {
  const reduxAction = useReduxAction()

  const [query, setQuery] = React.useState('')
  const [activeTab, setActiveTab] = React.useState()
  const [searchFilters, searchFiltersDispatch] = React.useReducer(searchFiltersReducer, {
    vocabs: true,
    phrases: false,
    words: false,
  })

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

  const needShowSearchResults = !!searchData?.results?.length && query.length > 0

  const vocabFilterList = React.useMemo(
    () =>
      vocabs.map(({ _id, name, ...item }) => {
        let selected

        if (Array.isArray(searchFilters.vocabs)) {
          selected = searchFilters.vocabs.includes(_id)
        } else {
          selected = false
        }

        console.log(_id, searchFilters.vocabs)

        return {
          type: 'Vocab',
          key: `Vocab-${_id}`,
          data: { id: _id },
          name: item.default ? 'Default' : name,
          selected,
        }
      }),
    [vocabs, searchFilters.vocabs],
  )

  const filtersData = [
    {
      name: 'Тип поиска',
      items: [
        {
          type: 'WordsAndPhrases',
          key: 'WordsAndPhrases',
          name: 'Слова и фразы',
          selected: searchFilters.phrases && searchFilters.words,
        },
        {
          type: 'Words',
          key: 'Words',
          name: 'Только слова',

          selected: searchFilters.words && !searchFilters.phrases,
        },
        {
          type: 'Phrases',
          key: 'Phrases',
          name: 'Только фразы',
          selected: searchFilters.phrases && !searchFilters.words,
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
    setQuery(text)
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

  const handleChangeFilter = ({ type, selected, data }) => {
    searchFiltersDispatch({ type, selected, data })
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

  React.useEffect(() => {
    if (query) {
      debouncedSearch({
        query,
        filters: {
          common: false,
          ...searchFilters,
        },
      })
    }
  }, [searchFilters, query])

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
          items={filtersData}
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
