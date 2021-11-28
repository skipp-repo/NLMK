import { ContentState } from 'draft-js'
import React from 'react'
import './EditDocument.scss'
import { useSelector } from 'react-redux'
import { useDebouncedCallback } from 'use-debounce'
import { useLocation } from 'wouter'
import Container from '../../components/Container/Container'
import EditableTitle from '../../components/EditableTitle/EditableTitle'
import EditorTranslationPopup from '../../components/EditorTranslationPopup/EditorTranslationPopup'
import useReduxAction from '../../hooks/useReduxAction'
import BackLink from '../../components/BackLink/BackLink'
import Editor, { EditorRef } from '../../components/Editor/Editor'
import * as documentsSlice from '../../redux/slices/documents'
import contentStateToHtml from '../../utils/contentStateToHtml'
import VocabsPanel from './VocabsPanel'
import GlossariessPanel from './GlossariesPanel'
import { usePopper } from 'react-popper'

export type MyEditDocumentProps = {
  params: { id: string }
}

const EditDocument: React.FC<MyEditDocumentProps> = ({ params: { id } }) => {
  const reduxAction = useReduxAction()
  const [referenceElement, setReferenceElement] = React.useState(null)
  const [popperElement, setPopperElement] = React.useState(null)

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: 'arrow' }],
  })

  const [docName, setDocName] = React.useState('')

  const [, setLocation] = useLocation()
  const editorRef: EditorRef = React.useRef()

  const [selectedState, setSelectedState] = React.useState({ word: undefined, sentence: undefined })

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

  const updatePopupTranslation = () => {
    let selection = document.getSelection()

    const range = selection.rangeCount && selection.getRangeAt(0)

    const virtualReference = {
      getBoundingClientRect() {
        return range.getBoundingClientRect()
      },
    }

    setReferenceElement(virtualReference)
  }

  const handleSelect = () => {
    const selection = document.getSelection()
    const selectionText = selection.toString()
    const sentence = selection.anchorNode.textContent

    if (selectionText.length > 1) {
      setSelectedState({
        word: selectionText,
        sentence: sentence,
      })

      updatePopupTranslation()
    } else {
      setSelectedState({
        word: undefined,
        sentence: undefined,
      })
    }
  }

  const handleScroll = () => {
    updatePopupTranslation()
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
              onSelect={handleSelect}
              onScroll={handleScroll}
              html={currentDocument?.data}
            />

            {selectedState.word && (
              <EditorTranslationPopup
                word={selectedState.word}
                sentence={selectedState.sentence}
                ref={setPopperElement}
                style={styles.popper}
                {...attributes.popper}
              />
            )}
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
