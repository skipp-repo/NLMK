import React from 'react'
import proschet from 'proschet'
import { useAsyncCallback } from 'react-async-hook'
import { downloadDocumentsByIds as downloadDocumentsByIdsRequest } from '../../api/requests/downloadDocumentsByIds'
import Checkbox from '../../components/Checkbox/Checkbox'
import Container from '../../components/Container/Container'
import IconButton from '../../components/IconButton/IconButton'
import ItemsCount from '../../components/ItemsCount/ItemsCount'
import { useSelector } from 'react-redux'
import { ReactComponent as DownloadIcon } from '../../assets/icons/download.svg'
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg'
import * as documentsSlice from '../../redux/slices/documents'
import useReduxAction from '../../hooks/useReduxAction'
import * as userSlice from '../../redux/slices/user'

export type DocumentsActionsProps = JSX.IntrinsicElements['div'] & {}

const words = proschet(['документ', 'документа', 'документов'])

const DocumentsActions: React.FC<DocumentsActionsProps> = ({ children, className, ...props }) => {
  const reduxAction = useReduxAction()

  const documents = useSelector(documentsSlice.selectors.documentsList)

  const downloadDocumentsByIds = useAsyncCallback(async () => {
    return await downloadDocumentsByIdsRequest({ docIds: selectedIds })
  })

  const selectedIds = useSelector(documentsSlice.selectors.selectedItems)

  const [checkAll, setCheckAll] = React.useState<undefined | boolean>()

  const selectAll = reduxAction(documentsSlice.selectAll)
  const deleteDocuments = reduxAction(documentsSlice.deleteDocuments)

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
  const handleRemoveCards = () => {
    deleteDocuments({ docIds: selectedIds })
    selectAll({ select: false })
  }

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
        onClick={downloadDocumentsByIds.execute}
      />
    </Container>
  )
}

export default React.memo(DocumentsActions)
