import { EditorState } from 'draft-js'
import React from 'react'
import clsx from 'clsx'
import { useClickOutside } from 'use-events'
import EditorControl, { EditorControlProps } from './EditorControl'

export type FontSizeControlProps = Omit<EditorControlProps, 'onToggle'> & {
  editorState: EditorState
  styles: any
  setEditorState(newEditorState: EditorState): void
}

const fontSizes = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 38, 46, 54, 62, 72]

const FontSizeControl: React.FC<FontSizeControlProps> = ({
  editorState,
  style,
  styles,
  setEditorState,
  ...props
}) => {
  const [opened, setOpened] = React.useState(false)
  const ref = React.useRef()

  const handleToggle = () => {
    setOpened(true)
  }

  const setFontSize = (e, value) => {
    //Keep cursor focus inside Editor
    e.preventDefault()

    //remove current font size at selection
    const newEditorState = styles.fontSize.remove(editorState)

    //set editorState to display new font size
    setEditorState(styles.fontSize.add(newEditorState, value))

    //close dropdown menu
    setOpened(false)
  }

  //map array of integers to display options for dropdown
  const fontSizeOptions = fontSizes.map((fontSize) => (
    <div
      key={`font-size-${fontSize}`}
      className="FontSizeControl-option"
      //declare event for setting font size
      onMouseDown={(e) => setFontSize(e, `${fontSize}px`)}
    >
      {fontSize}
    </div>
  ))

  useClickOutside([ref], () => setOpened(false))

  return (
    <div className={clsx('FontSizeControl')} ref={ref}>
      <EditorControl onToggle={handleToggle} style={style} {...props} />

      {opened && <div className="FontSizeControl-dropdown">{fontSizeOptions}</div>}
    </div>
  )
}

export default React.memo(FontSizeControl)
