import { ContentState } from 'draft-js'
import React from 'react'
import './EditDocument.scss'
import { useSelector } from 'react-redux'
import { useDebouncedCallback } from 'use-debounce'
import { useLocation } from 'wouter'
import Container from '../../components/Container/Container'
import EditableTitle from '../../components/EditableTitle/EditableTitle'
import useReduxAction from '../../hooks/useReduxAction'
import BackLink from '../../components/BackLink/BackLink'
import Editor, { EditorRef } from '../../components/Editor/Editor'
import * as documentsSlice from '../../redux/slices/documents'
import contentStateToHtml from '../../utils/contentStateToHtml'
import VocabsPanel from './VocabsPanel'
import GlossariessPanel from './GlossariesPanel'

export type MyEditDocumentProps = {
  params: { id: string }
}

const EditDocument: React.FC<MyEditDocumentProps> = ({ params: { id } }) => {
  const reduxAction = useReduxAction()

  const [docName, setDocName] = React.useState('')

  const [, setLocation] = useLocation()
  const editorRef: EditorRef = React.useRef()

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
  }, 500)

  const handleChangeTitle = (newName) => {
    if (id === 'new') {
      setDocName(newName)
      return
    }

    renameDocument({ newName, id })
  }

  const handleAddWord = (word) => {
    if (!editorRef?.current?.insertText) return

    editorRef?.current?.insertText(word)
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

        <div className="EditDocument-wrapper">
          <div className="EditDocument-editor-wrapper">
            <EditableTitle title={docName} onChange={handleChangeTitle} />

            <Editor
              ref={editorRef}
              className="EditDocument-editor"
              onChange={handleChange}
              html={currentDocument?.data}
            />
          </div>

          <div className="EditDocument-panels">
            <VocabsPanel className="EditDocument-panel" onAdd={handleAddWord} />
            <GlossariessPanel className="EditDocument-panel" onAdd={handleAddWord} />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default React.memo(EditDocument)
