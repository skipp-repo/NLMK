import React from 'react'
import clsx from 'clsx'
import { Editor as DraftEditor, EditorState, RichUtils } from 'draft-js'
import 'draft-js/dist/Draft.css'
import EditorControls from './EditorControls'

import './Editor.scss'

export type EditorProps = JSX.IntrinsicElements['div'] & {}

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote'
    default:
      return null
  }
}

const Editor: React.FC<EditorProps> = ({ children, className, ...props }) => {
  const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty())

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

  return (
    <div className={clsx('Editor', className)} {...props}>
      <DraftEditor
        blockStyleFn={getBlockStyle}
        editorState={editorState}
        onChange={setEditorState}
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
