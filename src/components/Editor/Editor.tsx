import React, { MutableRefObject } from 'react'
import clsx from 'clsx'
import {
  ContentBlock,
  ContentState,
  DraftInlineStyle,
  Editor as DraftEditor,
  EditorState,
  Modifier,
  RichUtils,
} from 'draft-js'
import 'draft-js/dist/Draft.css'
import htmlToContentState from '../../utils/htmlToContentState'
import './Editor.scss'

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote'
    default:
      return null
  }
}

export type EditorProps = Omit<JSX.IntrinsicElements['div'], 'onChange' | 'onSelect'> & {
  onChange(content: ContentState): void
  onSelect(sentence?: string): void
  html: string
  editorState: EditorState
  setEditorState(editorState: EditorState): void
  customStyleFn: ((style: DraftInlineStyle, block: ContentBlock) => React.CSSProperties) | undefined
}

export type EditorRef = MutableRefObject<{
  insertText(text: string): void
}>

const Editor = React.forwardRef(
  (
    {
      children,
      className,
      html,
      onChange,
      onSelect,
      onScroll,
      editorState,
      setEditorState,
      customStyleFn,
      ...props
    }: EditorProps,
    ref: EditorRef,
  ) => {
    const editorRef = React.useRef()

    const handleKeyCommand = (command, editorState) => {
      const newState = RichUtils.handleKeyCommand(editorState, command)

      if (newState) {
        setEditorState(newState)
        return 'handled'
      }

      return 'not-handled'
    }

    const handleChange = (newState) => {
      onSelect()

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
        <div className="Editor-wrapper" onScroll={onScroll}>
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
      </div>
    )
  },
)

export default React.memo(Editor)
