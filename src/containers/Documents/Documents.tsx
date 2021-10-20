import React from 'react'
import { useSelector } from 'react-redux'
import Button from '../../components/Button/Button'
import Container from '../../components/Container/Container'
import PageTitle from '../../components/PageTitle/PageTitle'
import './Documents.scss'
import useReduxAction from '../../hooks/useReduxAction'
import * as documentsSlice from '../../redux/slices/documents'
import DocumentsActions from './DocumentsActions'
import Document from '../../components/Document/Document'
import NewDocument from '../../components/Document/NewDocument'

export type MyDocumentsProps = {}

const title = 'Документы'

const Documents: React.FC<MyDocumentsProps> = ({ children }) => {
  const reduxAction = useReduxAction()

  const documents = useSelector(documentsSlice.selectors.documentsList)

  const uploadDocument = reduxAction(documentsSlice.uploadDocument)
  const getDocuments = reduxAction(documentsSlice.getDocuments)

  const handleFileInputChange = ({ target }) => {
    const file = target.files[0]

    const data = new FormData()

    data.append('userDoc', file, file.name)

    uploadDocument(data)
  }

  const handleNewDocument = () => {}

  const handleClickDocument = (_id) => () => {}

  const renderDocument = ({ name, text, _id }) => (
    <Document
      key={_id}
      name={name}
      checked
      className="Documents-item"
      onClick={handleClickDocument(_id)}
    >
      {text}
    </Document>
  )

  React.useEffect(() => {
    getDocuments()
  }, [])

  console.log(documents)

  return (
    <div className="Documents">
      <Container className="Documents-header">
        <PageTitle className="Documents-title">{title}</PageTitle>

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
      </Container>

      <DocumentsActions />

      <Container className="Documents-items">
        <NewDocument onClick={handleNewDocument} className="Documents-item" />
        {documents?.map(renderDocument)}
      </Container>
    </div>
  )
}

export default React.memo(Documents)
