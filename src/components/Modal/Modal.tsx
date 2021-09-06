import React from 'react'
import ReactDom from 'react-dom'
import clsx from 'clsx'
import './Modal.scss'
import { ReactComponent as CloseIcon } from '../../assets/icons/popup-close.svg'

export type ModalProps = JSX.IntrinsicElements['div'] & {
  onClose(): void
  visible?: boolean
}

const modalRoot = document.getElementById('modal-container')

const Modal: React.FC<ModalProps> = ({ children, className, visible, onClose, ...props }) => {
  React.useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : 'unset'
  }, [visible])

  if (visible) {
    return ReactDom.createPortal(
      <div className="Modal">
        <div className="Modal-backdrop" />
        <div {...props} className={clsx('Modal-wrapper', className)}>
          <div className="Modal-close" onClick={onClose}>
            <CloseIcon />
          </div>
          <div className="Modal-content">{children}</div>
        </div>
      </div>,
      modalRoot,
    )
  }

  return null
}

export default React.memo(Modal)
