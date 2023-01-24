import React, { useState } from 'react'
import { usePopper } from 'react-popper'
import { PopperOptions, SideToolbarPosition } from '../@draft-js/SideToolbar/types'
import './Popover.scss'

export type PopoverProps = JSX.IntrinsicElements['div'] & {
  referenceElement: HTMLElement | null
  popperOptions?: PopperOptions
  position: SideToolbarPosition
}

const Popover: React.FC<PopoverProps> = ({
  referenceElement,
  children,
  className,
  position,
  popperOptions = {
    placement: position,
    modifiers: [{ name: 'arrow' }],
  },
}) => {
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null)
  const { styles, attributes } = usePopper(referenceElement, popperElement, popperOptions)
  return (
    <div ref={setPopperElement} style={styles.popper} {...attributes.popper} className={className}>
      {children}
    </div>
  )
}

export default React.memo(Popover)
