import fileDownload from 'js-file-download'
import React from 'react'
import proschet from 'proschet'
import { useAsyncCallback } from 'react-async-hook'
import { downloadVocabById } from '../../api/requests/downloadVocabById'
import { downloadVocabByIds as downloadVocabByIdsRequest } from '../../api/requests/downloadVocabByIds'
import ItemsCount from '../../components/ItemsCount/ItemsCount'
import Checkbox from '../../components/Checkbox/Checkbox'
import Container from '../../components/Container/Container'
import IconButton from '../../components/IconButton/IconButton'
import { useSelector } from 'react-redux'
import * as userSlice from '../../redux/slices/user'
import * as vocabsSlices from '../../redux/slices/vocabs'
import { ReactComponent as DownloadIcon } from '../../assets/icons/download.svg'
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg'
import VocabsDropdown from '../../components/VocabsDropdown/VocabsDropdown'
import * as vocabsSlice from '../../redux/slices/vocabs'
import useReduxAction from '../../hooks/useReduxAction'

export type MyVocabularyActionsProps = JSX.IntrinsicElements['div'] & { activeTab: number }

const words = proschet(['слово', 'слова', 'слов'])

const MyVocabularyActions: React.FC<MyVocabularyActionsProps> = ({
  children,
  className,
  activeTab,
  ...props
}) => {
  const reduxAction = useReduxAction()
  const vocabsByID = useSelector(vocabsSlices.selectors.vocabById(activeTab))

  const vocabs = useSelector(vocabsSlice.selectors.vocabsList)

  const selectedIds = useSelector(vocabsSlice.selectors.selectedCardsIdsByVocabId(activeTab))

  const [checkAll, setCheckAll] = React.useState<undefined | boolean>()
  const [vocabIdsForMoving, setVocabsIdsForMoving] = React.useState([])

  const editFolder = reduxAction(vocabsSlices.editFolder)
  const selectAll = reduxAction(vocabsSlice.selectAll)

  const token = useSelector(userSlice.selectors.token)

  const downloadCurrentVocab = useAsyncCallback(async (id) => {
    return await downloadVocabById({ token, id })
  })

  const downloadVocabByIds = useAsyncCallback(async () => {
    return await downloadVocabByIdsRequest({ token, cardIds: selectedIds })
  })

  const fixedVocabs = React.useMemo(
    () =>
      vocabs
        .filter(({ _id }) => activeTab !== _id)
        .map(({ _id, name, ...item }) => {
          return {
            id: _id,
            name: item.default ? 'Default' : name,
            checked: vocabIdsForMoving.includes(_id),
          }
        }),
    [vocabs, activeTab, vocabIdsForMoving],
  )

  const handleSelectAll = ({ target }) => {
    setCheckAll(target.checked ? true : undefined)
    selectAll({ vocabId: activeTab, select: target.checked })
  }

  const handleUnselectAll = ({ target: { checked } }) => {
    setCheckAll(checked ? false : undefined)
    if (checked) {
      selectAll({ vocabId: activeTab, select: false })
    }
  }

  const handleSelectGroupForMoving = (id, checked) => {
    if (checked) {
      setVocabsIdsForMoving((state) => [...state, id])

      editFolder({ id: activeTab, cardsToRemove: selectedIds })
      editFolder({ id, cardsToAdd: selectedIds })

      setTimeout(() => {
        setVocabsIdsForMoving([])
      }, 500)
    } else {
      setVocabsIdsForMoving((state) => {
        return state.filter((stateId) => stateId !== id)
      })
    }
  }

  const handleRemoveCards = () => {
    editFolder({ id: activeTab, cardsToRemove: selectedIds })
  }

  const handleDownloadVocab = () => {
    if (selectedIds.length) {
      downloadVocabByIds.execute()
    } else {
      downloadCurrentVocab.execute(activeTab)
    }
  }

  React.useEffect(() => {
    setCheckAll(undefined)
  }, [activeTab])

  return (
    <Container className="MyVocabulary-actions">
      <ItemsCount className="MyVocabulary-actions-count">{`${vocabsByID?.cards.length} ${words(
        vocabsByID?.cards.length,
      )}`}</ItemsCount>

      <VocabsDropdown
        text="Переместить в группу"
        items={fixedVocabs}
        onSelect={handleSelectGroupForMoving}
        disabled={!selectedIds.length}
      />
      <Checkbox
        className="MyVocabulary-actions-button"
        text="Отметить все"
        secondary
        checked={checkAll}
        onChange={handleSelectAll}
      />
      <Checkbox
        className="MyVocabulary-actions-button"
        text="Снять все"
        secondary
        checked={checkAll === false}
        onChange={handleUnselectAll}
      />

      <IconButton
        className="MyVocabulary-actions-button"
        text="Удалить"
        Icon={DeleteIcon}
        disabled={!selectedIds.length}
        onClick={handleRemoveCards}
      />
      <IconButton
        className="MyVocabulary-actions-button"
        text={selectedIds.length ? `Скачать группу (${selectedIds.length})` : 'Скачать группу'}
        Icon={DownloadIcon}
        onClick={handleDownloadVocab}
      />
    </Container>
  )
}

export default React.memo(MyVocabularyActions)
