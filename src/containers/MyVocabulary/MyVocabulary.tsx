import React from 'react'
import { useAsyncCallback } from 'react-async-hook'
import { useSelector } from 'react-redux'
import useTitle from 'react-use/lib/useTitle'
import { useDebouncedCallback } from 'use-debounce'
import { downloadAllVocabs as downloadAllVocabsRequest } from '../../api/requests/downloadAllVocabs'
import Button from '../../components/Button/Button'
import Container from '../../components/Container/Container'
import DownloadLink from '../../components/DownloadLink/DownloadLink'
import ModalNewVocabGroup from '../../components/ModalNewVocabGroup/ModalNewVocabGroup'
import ModalRemoveVocabGroup from '../../components/ModalRemoveVocabGroup/ModalRemoveVocabGroup'
import ModalRenameVocabGroup from '../../components/ModalRenameVocabGroup/ModalRenameVocabGroup'
import PageTitle from '../../components/PageTitle/PageTitle'
import Search from '../../components/Search/Search'
import Tabs from '../../components/Tabs/Tabs'
import TranslationCardSelectable from '../../components/TranslationCard/TranslationCardSelectable/TranslationCardSelectable'
import VocabsFilters from '../../components/VocabsFilters/VocabsFilters'
import useModal from '../../hooks/useModal'
import useReduxAction from '../../hooks/useReduxAction'
import * as appSlice from '../../redux/slices/app'
import * as translationSlice from '../../redux/slices/translation'
import { SpaceEnum, Translate } from '../../redux/slices/translation'
import * as userSlice from '../../redux/slices/user'
import * as vocabsSlice from '../../redux/slices/vocabs'
import { Filters } from '../../types/filters'
import './MyVocabulary.scss'
import MyVocabularyActions from './MyVocabularyActions'
import Loader from '../../components/Loader/Loader'

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
    case 'Glossary': {
      let glossaries = state.glossaries

      if (Array.isArray(glossaries)) {
        if (action.selected) {
          glossaries = [...glossaries, action.data.id]
        } else {
          glossaries = glossaries.filter((id) => id !== action.data.id)

          if (!glossaries.length) {
            glossaries = true
          }
        }
      } else {
        if (action.selected) {
          glossaries = [action.data.id]
        }
      }

      return { ...state, glossaries }
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
    glossaries: true,
    phrases: true,
    words: true,
    vocabs: true,
  })

  const vocabsByID = useSelector(vocabsSlice.selectors.vocabById(activeTab))
  const vocabs = useSelector(vocabsSlice.selectors.vocabsList)
  const token = useSelector(userSlice.selectors.token)
  const glossaries = useSelector(userSlice.selectors.glossaries)
  const { getVocabsLoading } = useSelector(vocabsSlice.selectors.flags)

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

  const createFolder = reduxAction(vocabsSlice.createFolder)
  const removeFolder = reduxAction(vocabsSlice.removeFolder)
  const editFolder = reduxAction(vocabsSlice.editFolder)
  const selectCard = reduxAction(vocabsSlice.selectCard)
  const getData = reduxAction(appSlice.getData)
  const search = reduxAction((params: Omit<Translate, 'space'>) =>
    translationSlice.translate({ space: SpaceEnum.MainVocabs, ...params }),
  )
  const debouncedSearch = useDebouncedCallback(search, 300)
  const downloadAllVocabs = useAsyncCallback(async () => {
    return await downloadAllVocabsRequest({ token })
  })

  const searchData = useSelector(translationSlice.selectors.mainVocabsSearchResults)

  const needShowSearchResults = query.length > 0

  const glossariesFilterList = React.useMemo(
    () =>
      glossaries.map(({ _id, name, ...item }) => {
        let selected

        if (Array.isArray(searchFilters.glossaries)) {
          selected = searchFilters.glossaries.includes(_id)
        } else {
          selected = false
        }

        return {
          type: 'Glossary',
          key: `Glossary-${_id}`,
          data: { id: _id },
          name: name,
          selected,
        }
      }),
    [glossaries, searchFilters.glossaries],
  )

  const filtersData: Filters = [
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
      items: glossariesFilterList,
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

  const isShowVocabsCards = !getVocabsLoading

  return (
    <div className="MyVocabulary">
      <Container className="MyVocabulary-header">
        <PageTitle className="MyVocabulary-title">{title}</PageTitle>

        <DownloadLink onClick={downloadAllVocabs.execute}>Скачать все слова</DownloadLink>

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
          editable
        />
      </Container>

      <MyVocabularyActions activeTab={activeTab} />

      <Container className="MyVocabulary-search">
        <Search className="MyVocabulary-search-input" onChange={handleSearch} suggestions={[]} />

        <VocabsFilters
          className="MyVocabulary-search-filter"
          items={filtersData}
          onSelect={handleChangeFilter}
        />
      </Container>

      {getVocabsLoading && <Loader />}

      {!getVocabsLoading && !needShowSearchResults && (
        <Container className="MyVocabulary-cards">{vocabsByID?.cards?.map(renderCard)}</Container>
      )}

      {needShowSearchResults && (
        <Container className="MyVocabulary-cards">
          {searchData?.results?.length ? searchData?.results?.map(renderCard) : 'Ничего не найдено'}
        </Container>
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
