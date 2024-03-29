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
import VocabListDropdown from '../VocabListDropdown/VocabListDropdown'
import * as vocabsSlice from '../../redux/slices/vocabs'
import useReduxAction from '../../hooks/useReduxAction'

export type MyVocabularyActionsProps = JSX.IntrinsicElements['div'] & { activeTab: number }

const words = proschet(['слово', 'слова', 'слов'])

const MyVocabularyActions: React.FC<MyVocabularyActionsProps> = ({ activeTab }) => {
  const [checkAll, setCheckAll] = React.useState<undefined | boolean>()
  const [vocabIdsForMoving, setVocabsIdsForMoving] = React.useState([])

  const reduxAction = useReduxAction()
  const vocabsByID = useSelector(vocabsSlices.selectors.vocabById(activeTab))
  const selectedIds = useSelector(vocabsSlice.selectors.selectedItems)

  const editFolder = reduxAction(vocabsSlices.editFolder)
  const selectAll = reduxAction(vocabsSlice.selectAll)

  const downloadCurrentVocab = useAsyncCallback(async (id) => {
    return await downloadVocabById({ id })
  })

  const downloadVocabByIds = useAsyncCallback(async () => {
    return await downloadVocabByIdsRequest({ cardIds: selectedIds })
  })

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
        selectAll({ vocabId: activeTab, select: false })
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

  const handleDownload = () => {
    if (selectedIds.length) {
      downloadVocabByIds.execute()
    } else {
      downloadCurrentVocab.execute(activeTab)
    }
  }

  React.useEffect(() => {
    setCheckAll(undefined)
  }, [activeTab])

  const count = vocabsByID?.cards?.length || 0

  return (
    <Container className="MyVocabulary-actions">
      <ItemsCount className="Glossaries-actions-count">{`${count} ${words(count)}`}</ItemsCount>

      <div className="MyVocabulary-actions-wrapper">
        <VocabListDropdown
          activeTab={activeTab}
          vocabIdsForMoving={vocabIdsForMoving}
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
          onClick={handleDownload}
          disabled={count === 0}
        />
      </div>
    </Container>
  )
}

export default React.memo(MyVocabularyActions)
