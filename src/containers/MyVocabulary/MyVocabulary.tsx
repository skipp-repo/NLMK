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
import useModal from '../../hooks/useModal'
import useReduxAction from '../../hooks/useReduxAction'
import * as autocompleteSlice from '../../redux/slices/autocomplete'
import * as vocabsSlices from '../../redux/slices/vocabs'
import * as vocabsSlice from '../../redux/slices/vocabs'
import * as appSlice from '../../redux/slices/app'
import MyVocabularyActions from './MyVocabularyActions'
import Search from '../../components/Search/Search'
import VocabsFilters from '../../components/VocabsFilters/VocabsFilters'
import ModalNewVocabGroup from '../../components/ModalNewVocabGroup/ModalNewVocabGroup'
import ModalRemoveVocabGroup from '../../components/ModalRemoveVocabGroup/ModalRemoveVocabGroup'
import ModalRenameVocabGroup from '../../components/ModalRenameVocabGroup/ModalRenameVocabGroup'

export type MyVocabularyProps = {}

const title = 'Мой словарь'

const MyVocabulary: React.FC<MyVocabularyProps> = () => {
  const reduxAction = useReduxAction()

  const queryRef = React.useRef('')

  const vocabs = useSelector(vocabsSlice.selectors.vocabsList)

  const autoCompleteData = useSelector(
    autocompleteSlice.selectors.autocompleteByQuery(queryRef.current),
  )

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

  const handleSearch = (text) => {}

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
