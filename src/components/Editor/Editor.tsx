import React, { MutableRefObject } from 'react'
import clsx from 'clsx'
import {
  ContentState,
  Editor as DraftEditor,
  EditorState,
  Modifier,
  RichUtils,
  SelectionState,
} from 'draft-js'
import createStyles from 'draft-js-custom-styles'
import 'draft-js/dist/Draft.css'
import htmlToContentState from '../../utils/htmlToContentState'
import EditorControls from './EditorControls'
import './Editor.scss'

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote'
    default:
      return null
  }
}

export type EditorProps = Omit<JSX.IntrinsicElements['div'], 'onChange'> & {
  onChange(content: ContentState): void
  html: string
}

export type EditorRef = MutableRefObject<{
  insertText(text: string): void
}>

const { styles, customStyleFn } = createStyles(['font-size'])

const Editor = React.forwardRef(
  ({ children, className, html, onChange, ...props }: EditorProps, ref: EditorRef) => {
    const [editorState, setEditorState] = React.useState<EditorState>(() =>
      EditorState.createEmpty(),
    )
    const lastSelectionState = React.useRef<SelectionState>()
    const editorRef = React.useRef()

    const handleKeyCommand = (command, editorState) => {
      const newState = RichUtils.handleKeyCommand(editorState, command)

      if (newState) {
        setEditorState(newState)
        return 'handled'
      }

      return 'not-handled'
    }

    const handleToggle = (newState) => {
      setEditorState(newState)
    }

    const handleChange = (newState) => {
      lastSelectionState.current = editorState.getSelection()

      setEditorState(newState)

      const content = newState.getCurrentContent()

      onChange(content)
    }

    const insertText = React.useCallback(
      (text: string) => {
        const contentState = editorState.getCurrentContent()

        const newContentState = Modifier.insertText(
          contentState,
          editorState.getSelection(),
          ` ${text} `,
          editorState.getCurrentInlineStyle(),
        )

        const newEditorState = EditorState.push(editorState, newContentState, 'insert-characters')

        setEditorState(newEditorState)
      },
      [editorState],
    )

    React.useEffect(() => {
      if (!html) return

      const contentState = htmlToContentState(html)

      setEditorState(EditorState.createWithContent(contentState))
    }, [html])

    React.useEffect(() => {
      if (!ref) return

      ref.current = {
        insertText,
      }
    }, [ref, insertText])

    return (
      <div className={clsx('Editor', className)} {...props}>
        <div className="Editor-wrapper">
          <DraftEditor
            ref={editorRef}
            blockStyleFn={getBlockStyle}
            editorState={editorState}
            onChange={handleChange}
            handleKeyCommand={handleKeyCommand}
            placeholder="Введите текст или вставьте текст документа в это поле..."
            spellCheck={true}
            customStyleFn={customStyleFn}
          />
        </div>
        <EditorControls
          className="Editor-controls"
          onToggle={handleToggle}
          editorState={editorState}
          styles={styles}
          setEditorState={setEditorState}
        />
      </div>
    )
  },
)

export default React.memo(Editor)
