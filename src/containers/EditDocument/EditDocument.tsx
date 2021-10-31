import { ContentState } from 'draft-js'
import React from 'react'
import './EditDocument.scss'
import { useSelector } from 'react-redux'
import Container from '../../components/Container/Container'
import useReduxAction from '../../hooks/useReduxAction'
import BackLink from '../../components/BackLink/BackLink'
import Editor from '../../components/Editor/Editor'
import * as documentsSlice from '../../redux/slices/documents'
import contentStateToDocx from '../../utils/contentStateToDocx'

export type MyEditDocumentProps = {
  params: { id: string }
}

const EditDocument: React.FC<MyEditDocumentProps> = ({ params: { id } }) => {
  const reduxAction = useReduxAction()

  const currentDocument = useSelector(documentsSlice.selectors.documentById(id))
  const uploadDocument = reduxAction(documentsSlice.uploadDocument)

  const handleChange = async (content: ContentState) => {
    if (content.hasText()) {
      const file = await contentStateToDocx(content)

      const formData = new FormData()
      formData.append('userDoc', file, file?.name || 'unnamed')

      if (id === 'new') {
        uploadDocument(formData)
      }
    }
  }

  return (
    <div className="EditDocument">
      <Container>
        <BackLink href="/documents/">Вернуться назад</BackLink>

        <Editor className="EditDocument-editor" onChange={handleChange} />
      </Container>
    </div>
  )
}

export default React.memo(EditDocument)
