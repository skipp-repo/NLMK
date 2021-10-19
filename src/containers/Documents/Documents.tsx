import React from 'react'
import Button from '../../components/Button/Button'
import Container from '../../components/Container/Container'
import PageTitle from '../../components/PageTitle/PageTitle'
import './Documents.scss'
import DocumentsActions from './DocumentsActions'

export type MyDocumentsProps = {}

const title = 'Документы'

const Documents: React.FC<MyDocumentsProps> = ({ children }) => {
  return (
    <div className="Documents">
      <Container className="Documents-header">
        <PageTitle className="Documents-title">{title}</PageTitle>

        <Button className="Documents-button">ЗАГРУЗИТЬ ДОКУМЕНТ</Button>
      </Container>

      <DocumentsActions />
    </div>
  )
}

export default React.memo(Documents)
