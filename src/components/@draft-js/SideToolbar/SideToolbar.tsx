import React, { ReactElement } from 'react'
import { createStore } from '@draft-js-plugins/utils'
import Toolbar from './components/Toolbar/Toolbar'
import { SideToolbarProps, StoreItemMap, SideToolbarPlugin, SideToolbarPluginConfig } from './types'

export default (config: SideToolbarPluginConfig = {}): SideToolbarPlugin => {
  const store = createStore<StoreItemMap>({
    isVisible: false,
  })

  const { position = 'bottom', popperOptions } = config

  const SideToolbar = (props: SideToolbarProps): ReactElement => (
    <Toolbar
      {...props}
      store={store}
      position={position}
      popperOptions={popperOptions}
      className="SideToolbar-popover"
    />
  )

  return {
    initialize: ({ setEditorState, getEditorState, getEditorRef }) => {
      store.updateItem('getEditorState', getEditorState)
      store.updateItem('setEditorState', setEditorState)
      store.updateItem('getEditorRef', getEditorRef)
    },
    // Re-Render the toolbar on every change
    onChange: (editorState) => {
      return editorState
    },
    SideToolbar,
  }
}
