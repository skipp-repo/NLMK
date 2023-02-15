import React from 'react'
import proschet from 'proschet'
import { useAsyncCallback } from 'react-async-hook'
import { downloadGlossaryById } from '../../api/requests/downloadGlossaryById'
import { downloadVocabByIds as downloadVocabByIdsRequest } from '../../api/requests/downloadVocabByIds'
import ItemsCount from '../../components/ItemsCount/ItemsCount'
import Checkbox from '../../components/Checkbox/Checkbox'
import Container from '../../components/Container/Container'
import IconButton from '../../components/IconButton/IconButton'
import { useSelector } from 'react-redux'
import * as glossariesSlice from '../../redux/slices/glossaries'
import * as userSlice from '../../redux/slices/user'
import { ReactComponent as DownloadIcon } from '../../assets/icons/download.svg'
import * as vocabsSlice from '../../redux/slices/vocabs'
import useReduxAction from '../../hooks/useReduxAction'
import VocabListDropdown from '../VocabListDropdown/VocabListDropdown'

export type GlossariesProps = JSX.IntrinsicElements['div'] & { activeTab: number }

const words = proschet(['слово', 'слова', 'слов'])

const GlossariesActions: React.FC<GlossariesProps> = ({ className, activeTab, ...props }) => {
  const reduxAction = useReduxAction()
  const glossaryById = useSelector(glossariesSlice.selectors.glossaryById(activeTab))

  const selectedIds = useSelector(glossariesSlice.selectors.selectedItems)

  const [checkAll, setCheckAll] = React.useState<undefined | boolean>()
  const [vocabIdsForMoving, setVocabsIdsForMoving] = React.useState([])

  const editFolder = reduxAction(vocabsSlice.editFolder)
  const selectAll = reduxAction(glossariesSlice.selectAll)

  const downloadGlossary = useAsyncCallback(async (id) => {
    return await downloadGlossaryById({ id })
  })

  const downloadVocabByIds = useAsyncCallback(async () => {
    return await downloadVocabByIdsRequest({ cardIds: selectedIds })
  })

  const handleSelectAll = ({ target }) => {
    setCheckAll(target.checked ? true : undefined)
    selectAll({ glossaryId: activeTab, select: target.checked })
  }

  const handleUnselectAll = ({ target: { checked } }) => {
    setCheckAll(checked ? false : undefined)
    if (checked) {
      selectAll({ glossaryId: activeTab, select: false })
    }
  }

  const handleSelectGroupForMoving = (id, checked) => {
    if (checked) {
      setVocabsIdsForMoving((state) => [...state, id])

      editFolder({ id: activeTab, cardsToRemove: selectedIds })
      editFolder({ id, cardsToAdd: selectedIds })

      setTimeout(() => {
        setVocabsIdsForMoving([])
        selectAll({ glossaryId: activeTab, select: false })
      }, 500)
    } else {
      setVocabsIdsForMoving((state) => {
        return state.filter((stateId) => stateId !== id)
      })
    }
  }

  const handleDownload = () => {
    if (selectedIds.length) {
      downloadVocabByIds.execute()
    } else {
      downloadGlossary.execute(activeTab)
    }
  }

  React.useEffect(() => {
    setCheckAll(undefined)
  }, [activeTab])

  const count = glossaryById?.cards?.length || 0

  return (
    <Container className="Glossaries-actions">
      <ItemsCount className="Glossaries-actions-count">{`${count} ${words(count)}`}</ItemsCount>

      <div className="Glossaries-actions-wrapper">
        <VocabListDropdown
          activeTab={activeTab}
          vocabIdsForMoving={vocabIdsForMoving}
          onSelect={handleSelectGroupForMoving}
          disabled={!selectedIds.length}
        />
        <Checkbox
          className="Glossaries-actions-button"
          text="Отметить все"
          secondary
          checked={checkAll}
          onChange={handleSelectAll}
        />
        <Checkbox
          className="Glossaries-actions-button"
          text="Снять все"
          secondary
          checked={checkAll === false}
          onChange={handleUnselectAll}
        />
        <IconButton
          className="Glossaries-actions-button"
          text={selectedIds.length ? `Скачать группу (${selectedIds.length})` : 'Скачать группу'}
          Icon={DownloadIcon}
          onClick={handleDownload}
        />
      </div>
    </Container>
  )
}

export default React.memo(GlossariesActions)
