import React from 'react'
import './EditDocument.scss'
import Container from '../../components/Container/Container'
import useReduxAction from '../../hooks/useReduxAction'
import BackLink from '../../components/BackLink/BackLink'
import Editor from '../../components/Editor/Editor'

export type MyEditDocumentProps = {}

const EditDocument: React.FC<MyEditDocumentProps> = ({ children }) => {
  const reduxAction = useReduxAction()

  return (
    <div className="EditDocument">
      <Container>
        <BackLink href="/documents/">Вернуться назад</BackLink>

        <Editor />
      </Container>
    </div>
  )
}

export default React.memo(EditDocument)
