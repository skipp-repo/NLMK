import React, { ReactElement, useState, useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import DraftOffsetKey from 'draft-js/lib/DraftOffsetKey'
import { PopperOptions, SideToolbarPluginStore, SideToolbarPosition } from '../../types'
import Popover from '../../../../Popover/Popover'
import '../../SideToolbar.scss'

export type ToolbarProps = JSX.IntrinsicElements['div'] & {
  store: SideToolbarPluginStore
  position: SideToolbarPosition
  popperOptions?: PopperOptions
  className: string
}

export default function Toolbar({
  position,
  popperOptions,
  store,
  children,
  className,
}: ToolbarProps): ReactElement | null {
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null)

  const onUpdate = useDebouncedCallback(({ target, type }) => {
    const editorState = store.getItem('getEditorState')!()
    const documentSelection = document.getSelection()
    const selection = editorState.getSelection()
    const text = documentSelection.toString()

    if (type === 'click' && target?.closest && target?.closest(`.${className}`)) return

    if (!text) {
      setReferenceElement(null)
      return
    }

    const currentContent = editorState!.getCurrentContent()
    const currentBlock = currentContent.getBlockForKey(selection.getStartKey())

    // TODO verify that always a key-0-0 exists
    const offsetKey = DraftOffsetKey.encode(currentBlock.getKey(), 0, 0)
    // Note: need to wait on tick to make sure the DOM node has been create by Draft.js
    setTimeout(() => {
      const node = document.querySelectorAll<HTMLDivElement>(`[data-offset-key="${offsetKey}"]`)[0]
      setReferenceElement(node)
    }, 0)
  }, 100)

  useEffect(() => {
    window.document.addEventListener('click', onUpdate)
    window.document.addEventListener('keydown', onUpdate)

    return () => {
      window.document.removeEventListener('click', onUpdate)
      window.document.removeEventListener('keydown', onUpdate)
    }
  }, [store])

  if (referenceElement === null) {
    //do not show popover if reference element is not there
    return null
  }

  return (
    <>
      <Popover
        className={className}
        referenceElement={referenceElement}
        position={position}
        popperOptions={popperOptions}
      >
        {children}
      </Popover>
    </>
  )
}
