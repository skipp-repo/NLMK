import { ContentState } from 'draft-js'
import React from 'react'
import './EditDocument.scss'
import { useSelector } from 'react-redux'
import { useDebouncedCallback } from 'use-debounce'
import Container from '../../components/Container/Container'
import EditableTitle from '../../components/EditableTitle/EditableTitle'
import useReduxAction from '../../hooks/useReduxAction'
import BackLink from '../../components/BackLink/BackLink'
import Editor from '../../components/Editor/Editor'
import * as documentsSlice from '../../redux/slices/documents'
import contentStateToHtml from '../../utils/contentStateToHtml'

export type MyEditDocumentProps = {
  params: { id: string }
}

const EditDocument: React.FC<MyEditDocumentProps> = ({ params: { id } }) => {
  const reduxAction = useReduxAction()

  const [docName, setDocName] = React.useState()

  const currentDocument = useSelector(documentsSlice.selectors.documentById(id))

  const uploadDocument = reduxAction(documentsSlice.uploadDocument)
  const updateDocument = reduxAction(documentsSlice.updateDocument)
  const getDocument = reduxAction(documentsSlice.getDocument)
  const renameDocument = reduxAction(documentsSlice.renameDocument)

  const handleChange = useDebouncedCallback(async (content: ContentState) => {
    if (content.hasText()) {
      const documentHTML = await contentStateToHtml(content)

      if (id === 'new') {
        uploadDocument({ documentHTML, documentName: docName })
      } else {
        updateDocument({ documentHTML, id })
      }
    }
  }, 1000)

  const handleChangeTitle = (newName) => {
    if (id === 'new') {
      setDocName(newName)
      return
    }

    renameDocument({ newName, id })
  }

  React.useEffect(() => {
    if (id === 'new') return

    getDocument({ id })
  }, [id])

  return (
    <div className="EditDocument">
      <Container>
        <BackLink href="/documents/">Вернуться назад</BackLink>

        <EditableTitle title={currentDocument?.name} onChange={handleChangeTitle} />

        <Editor
          className="EditDocument-editor"
          onChange={handleChange}
          html={currentDocument?.data}
        />
      </Container>
    </div>
  )
}

export default React.memo(EditDocument)
