import { ContentState } from 'draft-js'
import React from 'react'
import './EditDocument.scss'
import { useSelector } from 'react-redux'
import { useDebouncedCallback } from 'use-debounce'
import { useLocation } from 'wouter'
import AddWordsPanel from '../../components/AddWordsPanel/AddWordsPanel'
import Container from '../../components/Container/Container'
import EditableTitle from '../../components/EditableTitle/EditableTitle'
import useReduxAction from '../../hooks/useReduxAction'
import BackLink from '../../components/BackLink/BackLink'
import Editor from '../../components/Editor/Editor'
import * as documentsSlice from '../../redux/slices/documents'
import contentStateToHtml from '../../utils/contentStateToHtml'
import VocabsPanel from './VocabsPanel'

export type MyEditDocumentProps = {
  params: { id: string }
}

const EditDocument: React.FC<MyEditDocumentProps> = ({ params: { id } }) => {
  const reduxAction = useReduxAction()

  const [docName, setDocName] = React.useState('')

  const [, setLocation] = useLocation()

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
        setLocation('/documents/')
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

  React.useEffect(() => {
    let title = ''

    if (id === 'new') {
      title = 'Новый документ'
    } else if (currentDocument?.name) {
      title = currentDocument?.name
    }

    setDocName(title)
  }, [currentDocument?.name, id])

  return (
    <div className="EditDocument">
      <Container>
        <BackLink href="/documents/">Вернуться назад</BackLink>

        <EditableTitle title={docName} onChange={handleChangeTitle} />

        <div className="EditDocument-editor-wrapper">
          <Editor
            className="EditDocument-editor"
            onChange={handleChange}
            html={currentDocument?.data}
          />

          <div className="EditDocument-panels">
            <VocabsPanel />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default React.memo(EditDocument)
