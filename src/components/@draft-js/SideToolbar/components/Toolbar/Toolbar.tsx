import React from 'react'
import { PopperOptions, SideToolbarPosition } from '../../types'
import Popover from '../../../../Popover/Popover'
import VirtualElement from '../../../../../utils/VirtualElement'
import checkNodeContainsInNode from '../../../../../utils/checkNodeContainsInNode'
import '../../SideToolbar.scss'

export type ToolbarProps = JSX.IntrinsicElements['div'] & {
  position: SideToolbarPosition
  popperOptions?: PopperOptions
  className: string
}

const Toolbar: React.FC<ToolbarProps> = ({ position, popperOptions, children, className }) => {
  const [referenceElement, setReferenceElement] = React.useState<VirtualElement | null>(null)
  const checkNodeInTooltip = React.useCallback(
    (node) => checkNodeContainsInNode(node, className),
    [className],
  )
  const rangeRef = React.useMemo(() => new VirtualElement(checkNodeInTooltip), [checkNodeInTooltip])
  const popperRef = React.useRef<{ update: Function } | null>(null)

  React.useEffect(() => {
    rangeRef.rectChangedCallback = (rect) => {
      if (!rect) {
        setReferenceElement(null)
      } else {
        setReferenceElement(rangeRef)
      }

      if (popperRef.current) {
        popperRef.current.update()
      }
    }
  }, [])

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
        popperRef={popperRef}
      >
        {children}
      </Popover>
    </>
  )
}

export default Toolbar
