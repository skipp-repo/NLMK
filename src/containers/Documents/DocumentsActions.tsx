import React from 'react'
import proschet from 'proschet'
import Checkbox from '../../components/Checkbox/Checkbox'
import Container from '../../components/Container/Container'
import IconButton from '../../components/IconButton/IconButton'
import ItemsCount from '../../components/ItemsCount/ItemsCount'
import { useSelector } from 'react-redux'
import { ReactComponent as DownloadIcon } from '../../assets/icons/download.svg'
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg'
import * as documentsSlice from '../../redux/slices/documents'
import useReduxAction from '../../hooks/useReduxAction'

export type DocumentsActionsProps = JSX.IntrinsicElements['div'] & {}

const words = proschet(['документ', 'документов', 'документов'])

const DocumentsActions: React.FC<DocumentsActionsProps> = ({ children, className, ...props }) => {
  const reduxAction = useReduxAction()

  const documents = useSelector(documentsSlice.selectors.documentsList)

  const selectedIds = []

  const [checkAll, setCheckAll] = React.useState<undefined | boolean>()

  const selectAll = reduxAction(documentsSlice.selectAll)

  const handleSelectAll = ({ target }) => {
    setCheckAll(target.checked ? true : undefined)
    selectAll({ select: target.checked })
  }

  const handleUnselectAll = ({ target: { checked } }) => {
    setCheckAll(checked ? false : undefined)
    if (checked) {
      selectAll({ select: false })
    }
  }
  const handleRemoveCards = () => {}

  const handleDownloadVocab = () => {}

  return (
    <Container className="Documents-actions">
      <ItemsCount className="Documents-actions-count">{`${documents.length} ${words(
        documents.length,
      )}`}</ItemsCount>

      <Checkbox
        className="Documents-actions-button"
        text="Отметить все"
        secondary
        checked={checkAll}
        onChange={handleSelectAll}
      />
      <Checkbox
        className="Documents-actions-button"
        text="Снять все"
        secondary
        checked={checkAll === false}
        onChange={handleUnselectAll}
      />

      <IconButton
        className="Documents-actions-button"
        text="Удалить"
        Icon={DeleteIcon}
        disabled={!selectedIds.length}
        onClick={handleRemoveCards}
      />
      <IconButton
        className="Documents-actions-button"
        text={selectedIds.length ? `Скачать (${selectedIds.length})` : 'Скачать'}
        Icon={DownloadIcon}
        onClick={handleDownloadVocab}
      />
    </Container>
  )
}

export default React.memo(DocumentsActions)
