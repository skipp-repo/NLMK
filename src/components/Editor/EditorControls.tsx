import { EditorState, RichUtils } from 'draft-js'
import clsx from 'clsx'
import React from 'react'
import EditorControl from './EditorControl'
import { ReactComponent as BoldIcon } from '../../assets/icons/editor-bold.svg'
import { ReactComponent as ItalicIcon } from '../../assets/icons/editor-italic.svg'
import { ReactComponent as UnderlineIcon } from '../../assets/icons/editor-underline.svg'
import { ReactComponent as H1Icon } from '../../assets/icons/editor-h1.svg'
import { ReactComponent as H2Icon } from '../../assets/icons/editor-h2.svg'
import { ReactComponent as OlIcon } from '../../assets/icons/editor-ol.svg'
import { ReactComponent as UlIcon } from '../../assets/icons/editor-ul.svg'
import { ReactComponent as FSIcon } from '../../assets/icons/editor-fs.svg'
import FontSizeControl from './FontSizeControl'

export type EditorControlsProps = JSX.IntrinsicElements['div'] & {
  editorState: any
  className?: string
  styles: any
  onToggle(newState: any): void
  setEditorState(newEditorState: EditorState): void
}

enum ActionType {
  BLOCK = 1,
  INLINE = 2,
  SEPARATOR = 3,
  FONT_SIZE_CHANGE = 4,
}

const ACTIONS = [
  { type: ActionType.INLINE, label: 'Bold', Icon: BoldIcon, style: 'BOLD' },
  { type: ActionType.INLINE, label: 'Italic', Icon: ItalicIcon, style: 'ITALIC' },
  { type: ActionType.INLINE, label: 'Underline', Icon: UnderlineIcon, style: 'UNDERLINE' },
  { type: ActionType.SEPARATOR },
  { type: ActionType.BLOCK, label: 'H1', Icon: H1Icon, style: 'header-one' },
  { type: ActionType.BLOCK, label: 'H2', Icon: H2Icon, style: 'header-two' },
  { type: ActionType.SEPARATOR },
  { type: ActionType.BLOCK, label: 'UL', Icon: OlIcon, style: 'ordered-list-item' },
  { type: ActionType.BLOCK, label: 'OL', Icon: UlIcon, style: 'unordered-list-item' },
  { type: ActionType.SEPARATOR },
  {
    type: ActionType.FONT_SIZE_CHANGE,
    label: 'Font Size',
    Icon: FSIcon,
    style: 'unordered-list-item',
  },
]

const EditorControls: React.FC<EditorControlsProps> = ({
  editorState,
  className,
  styles,
  setEditorState,
  onToggle,

  ...props
}) => {
  const selection = editorState.getSelection()

  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType()

  const currentStyle = editorState.getCurrentInlineStyle()

  const toggleBlock = (blockType) => {
    const newState = RichUtils.toggleBlockType(editorState, blockType)

    onToggle(newState)
  }

  const toggleInline = (inlineStyle) => {
    const newState = RichUtils.toggleInlineStyle(editorState, inlineStyle)

    onToggle(newState)
  }

  const renderControl = React.useCallback(
    ({ type, Icon, style, label }, index) => {
      switch (type) {
        case ActionType.INLINE: {
          return (
            <EditorControl
              key={label}
              active={currentStyle.has(style)}
              Icon={Icon}
              label={label}
              style={style}
              onToggle={toggleInline}
            />
          )
        }

        case ActionType.BLOCK: {
          return (
            <EditorControl
              key={label}
              active={style === blockType}
              Icon={Icon}
              label={label}
              style={style}
              onToggle={toggleBlock}
            />
          )
        }

        case ActionType.FONT_SIZE_CHANGE: {
          return (
            <FontSizeControl
              editorState={editorState}
              key={label}
              active={style === blockType}
              Icon={Icon}
              label={label}
              style={style}
              styles={styles}
              setEditorState={setEditorState}
            />
          )
        }

        case ActionType.SEPARATOR: {
          return <div key={index} className="EditorControls-separator" />
        }
      }
    },
    [editorState],
  )

  return (
    <div className={clsx('EditorControls', className)} {...props}>
      {ACTIONS.map(renderControl)}
    </div>
  )
}

export default React.memo(EditorControls)
