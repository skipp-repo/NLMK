import React from 'react'
import * as PopperJS from '@popperjs/core'
import { usePopper } from 'react-popper'
import { PopperOptions, SideToolbarPosition } from '../@draft-js/SideToolbar/types'
import './Popover.scss'

export type PopoverProps = JSX.IntrinsicElements['div'] & {
  referenceElement: PopperJS.VirtualElement | null
  popperOptions?: PopperOptions
  position: SideToolbarPosition
  popperRef: React.Ref<any>
}

const Popover: React.FC<PopoverProps> = ({
  referenceElement,
  children,
  className,
  position,
  popperOptions = {
    placement: position,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 5],
        },
      },
    ],
  },
  popperRef,
}) => {
  const [popperElement, setPopperElement] = React.useState<HTMLElement | null>(null)
  const { styles, attributes, update } = usePopper(referenceElement, popperElement, popperOptions)

  React.useImperativeHandle(popperRef, () => ({
    update,
  }))

  return (
    <div ref={setPopperElement} style={styles.popper} {...attributes.popper} className={className}>
      {children}
    </div>
  )
}

export default React.memo(Popover)
