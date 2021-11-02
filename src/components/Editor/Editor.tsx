import React from 'react'
import clsx from 'clsx'
import { ContentState, Editor as DraftEditor, EditorState, RichUtils } from 'draft-js'
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

const Editor: React.FC<EditorProps> = ({ children, className, html, onChange, ...props }) => {
  const [editorState, setEditorState] = React.useState<EditorState>(() => EditorState.createEmpty())

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
    setEditorState(newState)

    const content = newState.getCurrentContent()

    onChange(content)
  }

  React.useEffect(() => {
    if (!html) return

    const contentState = htmlToContentState(html)

    console.log(html, contentState)

    setEditorState(EditorState.createWithContent(contentState))
  }, [html])

  return (
    <div className={clsx('Editor', className)} {...props}>
      <DraftEditor
        blockStyleFn={getBlockStyle}
        editorState={editorState}
        onChange={handleChange}
        handleKeyCommand={handleKeyCommand}
        placeholder="Введите текст или вставьте текст документа в это поле..."
        spellCheck={true}
      />

      <EditorControls
        className="Editor-controls"
        onToggle={handleToggle}
        editorState={editorState}
      />
    </div>
  )
}

export default React.memo(Editor)
