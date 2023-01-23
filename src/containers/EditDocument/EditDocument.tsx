import { ContentState, EditorState } from 'draft-js'
import React from 'react'
import './EditDocument.scss'
import { useAsyncCallback } from 'react-async-hook'
import { useSelector } from 'react-redux'
import { useDebouncedCallback } from 'use-debounce'
import { useLocation } from 'wouter'
import { downloadDocumentsByIds as downloadDocumentsByIdsRequest } from '../../api/requests/downloadDocumentsByIds'
import Button from '../../components/Button/Button'
import Container from '../../components/Container/Container'
import EditableTitle from '../../components/EditableTitle/EditableTitle'
import EditorControls from '../../components/Editor/EditorControls'
import EditorTranslationPopup from '../../components/EditorTranslationPopup/EditorTranslationPopup'
import useReduxAction from '../../hooks/useReduxAction'
import BackLink from '../../components/BackLink/BackLink'
import Editor, { EditorRef } from '../../components/Editor/Editor'
import * as documentsSlice from '../../redux/slices/documents'
import * as userSlice from '../../redux/slices/user'
import contentStateToHtml from '../../utils/contentStateToHtml'
import VocabsPanel from './VocabsPanel'
import GlossariessPanel from './GlossariesPanel'
import { usePopper } from 'react-popper'
import createStyles from 'draft-js-custom-styles'
import createSideToolbarPlugin from '../../components/@draft-js/SideToolbar/SideToolbar'

export type MyEditDocumentProps = {
  params: { id: string }
}

const { styles: editorStyles, customStyleFn } = createStyles(['font-size'])
const sideToolbarPlugin = createSideToolbarPlugin({
  popperOptions: {
    modifiers: [{ name: 'arrow' }],
  },
})

const plugins = [sideToolbarPlugin]

const { SideToolbar } = sideToolbarPlugin

const EditDocument: React.FC<MyEditDocumentProps> = ({ params: { id } }) => {
  const reduxAction = useReduxAction()
  const [editorState, setEditorState] = React.useState<EditorState>(() => EditorState.createEmpty())
  const [docName, setDocName] = React.useState('')
  const [, setLocation] = useLocation()
  const editorRef: EditorRef = React.useRef()
  const [selectedState, setSelectedState] = React.useState({ word: undefined, sentence: undefined })
  const currentDocument = useSelector(documentsSlice.selectors.documentById(id))
  const token = useSelector(userSlice.selectors.token)

  const uploadDocument = reduxAction(documentsSlice.uploadDocument)
  const updateDocument = reduxAction(documentsSlice.updateDocument)
  const getDocument = reduxAction(documentsSlice.getDocument)
  const renameDocument = reduxAction(documentsSlice.renameDocument)

  const downloadDocumentsByIds = useAsyncCallback(async () => {
    return await downloadDocumentsByIdsRequest({ token, docIds: [Number(id)] })
  })

  const handleChange = useDebouncedCallback(async (content: ContentState) => {
    if (content.hasText()) {
      const documentHTML = contentStateToHtml(content)

      if (id === 'new') {
        // @ts-ignore
        const { payload } = await uploadDocument({ documentHTML, documentName: docName })

        if (payload.data._id) {
          setLocation(`/documents/edit/${payload.data._id}`)
        }
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

  const handleAddWord = (word) => {
    if (!editorRef?.current?.insertText) return

    editorRef?.current?.insertText(word)
  }

  const updatePopupTranslation = () => {
    let selection = document.getSelection()

    const range = selection.rangeCount && selection.getRangeAt(0)
  }

  const handleSelect = () => {
    const selection = document.getSelection()
    const selectionText = selection.toString()
    const sentence = selection?.anchorNode?.textContent

    if (selectionText.length > 1 && sentence) {
      setSelectedState({
        word: selectionText,
        sentence: sentence,
      })

      updatePopupTranslation()
    } else {
      // setSelectedState({
      //   word: undefined,
      //   sentence: undefined,
      // })
    }
  }

  const handleScroll = () => {
    updatePopupTranslation()
  }

  const handleToggle = (newState) => {
    setEditorState(newState)
  }

  const handleBackPress = async () => {
    const content = editorState.getCurrentContent()
    const documentHTML = contentStateToHtml(content)

    if (id === 'new') {
      uploadDocument({ documentHTML, documentName: docName })
    } else {
      updateDocument({ documentHTML, id })
    }
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
      <Container className="EditDocument-container">
        <BackLink href="/documents/" onClick={handleBackPress}>
          Вернуться назад
        </BackLink>

        <div className="EditDocument-wrapper">
          <div className="EditDocument-editor-wrapper">
            <EditableTitle title={docName} onChange={handleChangeTitle} />

            <Editor
              ref={editorRef}
              className="EditDocument-editor"
              plugins={plugins}
              onChange={handleChange}
              onSelect={handleSelect}
              onScroll={handleScroll}
              html={currentDocument?.data}
              editorState={editorState}
              setEditorState={setEditorState}
              customStyleFn={customStyleFn}
            />

            <SideToolbar>
              <EditorTranslationPopup word={selectedState.word} sentence={selectedState.sentence} />
            </SideToolbar>
          </div>

          <div className="EditDocument-panels">
            <VocabsPanel className="EditDocument-panel" onAdd={handleAddWord} />
            <GlossariessPanel className="EditDocument-panel" onAdd={handleAddWord} />
          </div>
        </div>

        <div className="EditDocument-controls">
          <EditorControls
            onToggle={handleToggle}
            editorState={editorState}
            styles={editorStyles}
            setEditorState={setEditorState}
          />

          {id !== 'new' && (
            <Button className="EditDocument-button" onClick={downloadDocumentsByIds.execute}>
              СКАЧАТЬ ДОКУМЕНТ
            </Button>
          )}
        </div>
      </Container>
    </div>
  )
}

export default React.memo(EditDocument)
