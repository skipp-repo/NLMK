import React from 'react'

import './EditDocument.scss'
import Container from '../../components/Container/Container'
import useReduxAction from '../../hooks/useReduxAction'

export type MyEditDocumentProps = {}

const EditDocument: React.FC<MyEditDocumentProps> = ({ children }) => {
  const reduxAction = useReduxAction()

  return (
    <div className="EditDocument">
      <Container>Страница документа</Container>
    </div>
  )
}

export default React.memo(EditDocument)
