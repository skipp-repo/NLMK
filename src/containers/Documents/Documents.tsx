import React from 'react'
import Button from '../../components/Button/Button'
import Container from '../../components/Container/Container'
import PageTitle from '../../components/PageTitle/PageTitle'
import './Documents.scss'
import useReduxAction from '../../hooks/useReduxAction'
import * as documentsSlice from '../../redux/slices/documents'
import DocumentsActions from './DocumentsActions'

export type MyDocumentsProps = {}

const title = 'Документы'

const Documents: React.FC<MyDocumentsProps> = ({ children }) => {
  const reduxAction = useReduxAction()

  const uploadDocument = reduxAction(documentsSlice.uploadDocument)

  const handleFileInputChange = ({ target }) => {
    const file = target.files[0]

    const data = new FormData()

    data.append('userDoc', file, file.name)

    uploadDocument(data)
  }

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
    </div>
  )
}

export default React.memo(Documents)
