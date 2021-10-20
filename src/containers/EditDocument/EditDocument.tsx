import React from 'react'
import './EditDocument.scss'
import Container from '../../components/Container/Container'
import useReduxAction from '../../hooks/useReduxAction'
import BackLink from '../../components/BackLink/BackLink'

export type MyEditDocumentProps = {}

const EditDocument: React.FC<MyEditDocumentProps> = ({ children }) => {
  const reduxAction = useReduxAction()

  return (
    <div className="EditDocument">
      <Container>
        <BackLink href="/documents/">Вернуться назад</BackLink>
      </Container>
    </div>
  )
}

export default React.memo(EditDocument)
