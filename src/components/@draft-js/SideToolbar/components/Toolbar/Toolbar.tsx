import React, { ReactElement, useState, useCallback, useEffect } from 'react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import DraftOffsetKey from 'draft-js/lib/DraftOffsetKey'
import { PopperOptions, SideToolbarPluginStore, SideToolbarPosition } from '../../types'
import Popover from './Popover'

interface ToolbarProps {
  children?: ReactElement
  store: SideToolbarPluginStore
  position: SideToolbarPosition
  popperOptions?: PopperOptions
}

export default function Toolbar({
  position,
  popperOptions,
  store,
  children,
}: ToolbarProps): ReactElement | null {
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null)

  const onSelectionChanged = useCallback((selection) => {
    const editorState = store.getItem('getEditorState')!()

    console.log(selection.getHasFocus())

    // if (!selection.getHasFocus()) {
    //   setReferenceElement(null)
    //   return
    // }

    const currentContent = editorState!.getCurrentContent()
    const currentBlock = currentContent.getBlockForKey(selection.getStartKey())
    // TODO verify that always a key-0-0 exists
    const offsetKey = DraftOffsetKey.encode(currentBlock.getKey(), 0, 0)
    // Note: need to wait on tick to make sure the DOM node has been create by Draft.js
    setTimeout(() => {
      const node = document.querySelectorAll<HTMLDivElement>(`[data-offset-key="${offsetKey}"]`)[0]
      setReferenceElement(node)
    }, 0)
  }, [])

  useEffect(() => {
    store.subscribeToItem('selection', onSelectionChanged)
    return () => {
      store.unsubscribeFromItem('selection', onSelectionChanged)
    }
  }, [store])

  if (referenceElement === null) {
    //do not show popover if reference element is not there
    return null
  }

  return (
    <>
      <Popover
        referenceElement={referenceElement}
        position={position}
        popperOptions={popperOptions}
      >
        {children}
      </Popover>
    </>
  )
}
