import React from 'react'
import clsx from 'clsx'
import { usePopper } from 'react-popper'
import * as PopperJS from '@popperjs/core'
import BookmarkButton from '../BookmarkButton/BookmarkButton'
import './Tooltip.scss'
import Loader from '../Loader/Loader'
import sameWidth from '../../utils/popper/sameWidth'

export type TooltipProps = JSX.IntrinsicElements['div'] & {
  referenceElement: PopperJS.VirtualElement | null
  offset?: [number, number]
  placement?: PopperJS.Placement
  id: number
  error: boolean
  bookmarked: boolean
  loading: boolean
  onAddToBookmarks(id: number): void
}

const Tooltip: React.FC<TooltipProps> = React.forwardRef(
  (
    {
      children,
      className,
      referenceElement,
      placement,
      offset,
      id,
      error,
      loading,
      onAddToBookmarks,
      ...props
    },
    ref,
  ) => {
    const [bookmarked, setBookmarked] = React.useState(props.bookmarked)
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
          // @ts-ignore
          sameWidth,
        ],
      },
    )

    const handleBookmarkClick = () => {
      setBookmarked(!bookmarked)

      if (!bookmarked) {
        onAddToBookmarks(id)
      }
    }

    React.useEffect(() => {
      if (ref) {
        // @ts-ignore
        ref.current = {
          forceUpdate,
          update,
          state,
        }
      }
    }, [ref, forceUpdate, update, state])

    return (
      <div
        {...props}
        className={clsx('Echo-Extension-Tooltip', className)}
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
      >
        {error && <div className="Echo-Extension-Tooltip-errorText">Ошибка</div>}
        {loading ? (
          <Loader size={15} />
        ) : (
          <>
            <div className="Echo-Extension-Tooltip-text">{children}</div>
            <BookmarkButton
              className="Echo-Extension-Tooltip-bookmark"
              iconProps={{ width: 11, height: 14 }}
              onClick={handleBookmarkClick}
              active={bookmarked}
            />
          </>
        )}
      </div>
    )
  },
)

export default React.memo(Tooltip)
