import React from 'react'
import clsx from 'clsx'
import { usePopper } from 'react-popper'
import './Tooltip.scss'
import * as PopperJS from '@popperjs/core'

export type TooltipProps = JSX.IntrinsicElements['div'] & {
  referenceElement: Element
  offset?: [number, number]
  placement?: PopperJS.Placement
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  className,
  referenceElement,
  placement,
  offset,
  ...props
}) => {
  const [popperElement, setPopperElement] = React.useState(null)
  const { styles, attributes, forceUpdate, update, state } = usePopper(
    referenceElement,
    popperElement,
    {
      placement: placement || 'top',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset,
          },
        },
      ],
    },
  )
  //
  // React.useEffect(() => {
  //   if (ref) {
  //     // @ts-ignore
  //     ref.current = {
  //       forceUpdate,
  //       update,
  //       state,
  //     }
  //   }
  // }, [ref, forceUpdate, update, state])

  return (
    <div
      {...props}
      className={clsx('Echo-Extension-Tooltip', className)}
      ref={setPopperElement}
      style={styles.popper}
      {...attributes.popper}
    >
      {children}
    </div>
  )
}

export default React.memo(Tooltip)
