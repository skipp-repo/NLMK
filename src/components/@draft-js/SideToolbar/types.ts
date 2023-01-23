import { EditorState, SelectionState } from 'draft-js'
import * as PopperJS from '@popperjs/core'
import { Modifier } from 'react-popper'
import { ComponentType, ReactElement } from 'react'
import { EditorPlugin } from '@draft-js-plugins/editor'
import { Store } from '@draft-js-plugins/utils'

export interface StoreItemMap {
  selection?: SelectionState
  getEditorState?(): EditorState
  setEditorState?(state: EditorState): void
  isVisible?: boolean
  getEditorRef?(): {
    refs?: { editor: HTMLElement }
    editor: HTMLElement
  }
}

export type SideToolbarPluginStore = Store<StoreItemMap>

export type PopperOptions = Omit<Partial<PopperJS.Options>, 'modifiers'> & {
  createPopper?: typeof PopperJS.createPopper
  modifiers?: ReadonlyArray<Modifier<unknown>>
}

export interface SideToolbarProps {
  children?: ReactElement
}

export type SideToolbarPosition = 'left' | 'right' | 'top' | 'bottom'

export interface SideToolbarPluginConfig {
  position?: SideToolbarPosition
  popperOptions?: PopperOptions
}

export type SideToolbarPlugin = EditorPlugin & {
  SideToolbar: ComponentType<SideToolbarProps>
}
