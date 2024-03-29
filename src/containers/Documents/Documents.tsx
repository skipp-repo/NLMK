import React from 'react'
import { useAsyncCallback } from 'react-async-hook'
import { useSelector } from 'react-redux'
import { useDebouncedCallback } from 'use-debounce'
import { useLocation } from 'wouter'
import secrets from 'secrets'
import { downloadDocumentById as downloadDocumentByIdRequest } from '../../api/requests/downloadDocumentById'
import Button from '../../components/Button/Button'
import Container from '../../components/Container/Container'
import PageTitle from '../../components/PageTitle/PageTitle'
import './Documents.scss'
import useReduxAction from '../../hooks/useReduxAction'
import * as documentsSlice from '../../redux/slices/documents'
import DocumentsActions from './DocumentsActions'
import Document from '../../components/Document/Document'
import NewDocument from '../../components/Document/NewDocument'
import Loader from '../../components/Loader/Loader'

const { UPLOAD_DOCUMENTS } = secrets

export type MyDocumentsProps = {}

const title = 'Документы'

const Documents: React.FC<MyDocumentsProps> = () => {
  const reduxAction = useReduxAction()
  const [, setLocation] = useLocation()

  const documents = useSelector(documentsSlice.selectors.documentsList)

  const uploadDocument = reduxAction(documentsSlice.uploadDocument)
  const getDocuments = reduxAction(documentsSlice.getDocuments)
  const selectItem = reduxAction(documentsSlice.selectItem)
  const deleteDocument = reduxAction(documentsSlice.deleteDocument)

  const { getDocumentsLoading } = useSelector(documentsSlice.selectors.flags)

  const downloadDocumentById = useAsyncCallback(async (id) => {
    return await downloadDocumentByIdRequest({ id })
  })

  const handleFileInputChange = ({ target }) => {
    const file = target.files[0]

    uploadDocument({ file })
  }

  const handleNewDocument = () => {
    setLocation('/documents/edit/new')
  }

  const handleClickDocument = (_id) => {
    setLocation(`/documents/edit/${_id}`)
  }

  const handleSelect = (_id, selected) => {
    selectItem({ selected, _id })
  }

  const handleDownload = useDebouncedCallback((id) => {
    downloadDocumentById.execute(id)
  }, 1000)

  const handleDelete = (id) => {
    deleteDocument({ id })
  }

  const renderDocument = ({ name, text, _id, selected, data }) => (
    <Document
      key={_id}
      id={_id}
      name={name}
      checked={selected}
      data={data}
      className="Documents-item"
      onClick={handleClickDocument}
      onSelect={handleSelect}
      onDownload={handleDownload}
      onDelete={handleDelete}
    />
  )

  React.useEffect(() => {
    getDocuments()
  }, [])

  return (
    <div className="Documents">
      <Container className="Documents-header">
        <PageTitle className="Documents-title">{title}</PageTitle>

        {UPLOAD_DOCUMENTS && (
          <form className="Documents-button">
            <input
              type="file"
              name="userDoc"
              required
              className="Documents-input-file"
              accept=".doc,.docx"
              onChange={handleFileInputChange}
            />
            <Button className="Documents-button">ЗАГРУЗИТЬ ДОКУМЕНТ</Button>
          </form>
        )}
      </Container>

      <DocumentsActions />

      {getDocumentsLoading && <Loader />}

      {!getDocumentsLoading && (
        <Container className="Documents-items">
          <NewDocument onClick={handleNewDocument} className="Documents-item" />
          {documents?.map(renderDocument)}
        </Container>
      )}
    </div>
  )
}

export default React.memo(Documents)
