import React from 'react'
import clsx from 'clsx'
import { Editor as DraftEditor, EditorState, RichUtils } from 'draft-js'
import 'draft-js/dist/Draft.css'

import './Editor.scss'

export type EditorProps = {}

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },

  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
]

const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
]

enum ActionType {
  BLOCK = 1,
  INLINE = 1,
  SEPARATOR = 2,
}

const ACTIONS = [
  { type: ActionType.INLINE, label: 'Bold', icon: null, style: 'BOLD' },
  { type: ActionType.INLINE, label: 'Italic', icon: null, style: 'ITALIC' },
  { type: ActionType.INLINE, label: 'Underline', icon: null, style: 'UNDERLINE' },
  { type: ActionType.SEPARATOR },
  { type: ActionType.BLOCK, label: 'H1', icon: null, style: 'header-one' },
  { type: ActionType.BLOCK, label: 'H2', icon: null, style: 'header-two' },
  { type: ActionType.SEPARATOR },
  { type: ActionType.BLOCK, label: 'UL', icon: null, style: 'unordered-list-item' },
  { type: ActionType.BLOCK, label: 'OL', icon: null, style: 'ordered-list-item' },
]

function StyleButton({ onToggle, active, label, style }) {
  let className = 'RichEditor-styleButton'
  if (active) {
    className += ' RichEditor-activeButton'
  }

  return (
    <span
      className={className}
      onMouseDown={(e) => {
        e.preventDefault()
        onToggle(style)
      }}
    >
      {label}
    </span>
  )
}

function BlockStyleControls({ editorState, onToggle }) {
  const selection = editorState.getSelection()
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType()

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  )
}

function InlineStyleControls({ editorState, onToggle }) {
  const currentStyle = editorState.getCurrentInlineStyle()
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  )
}

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote'
    default:
      return null
  }
}

const Editor: React.FC<EditorProps> = ({ children, ...props }) => {
  const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty())

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)

    if (newState) {
      setEditorState(newState)
      return 'handled'
    }

    return 'not-handled'
  }

  return (
    <>
      <BlockStyleControls
        editorState={editorState}
        onToggle={(blockType) => {
          const newState = RichUtils.toggleBlockType(editorState, blockType)
          setEditorState(newState)
        }}
      />
      <InlineStyleControls
        editorState={editorState}
        onToggle={(inlineStyle) => {
          const newState = RichUtils.toggleInlineStyle(editorState, inlineStyle)
          setEditorState(newState)
        }}
      />
      <DraftEditor
        blockStyleFn={getBlockStyle}
        editorState={editorState}
        onChange={setEditorState}
        handleKeyCommand={handleKeyCommand}
        placeholder="Введите текст или вставьте текст документа в это поле..."
        spellCheck={true}
      />

      <div className="Editor-actions"></div>
    </>
  )
}

export default React.memo(Editor)
