import React from 'react'
import './ModalRemoveVocabGroup.scss'
import Modal, { ModalProps } from '../Modal/Modal'
import ModalButton from '../Modal/ModalButton/ModalButton'
import ModalTitle from '../Modal/ModalTitle/ModalTitle'

export type ModalRemoveVocabGroupProps = ModalProps & {
  onRemove(): void
}

const ModalRemoveVocabGroup: React.FC<ModalRemoveVocabGroupProps> = ({
  onRemove,
  onClose,
  ...props
}) => {
  return (
    <Modal {...props} onClose={onClose}>
      <ModalTitle>Удалить группу?</ModalTitle>

      <div className="ModalRemoveVocabGroup-container">
        <ModalButton
          text="ОТМЕНА"
          className="ModalRemoveVocabGroup-button"
          secondary
          onClick={onClose}
        />
        <ModalButton text="УДАЛИТЬ" className="ModalRemoveVocabGroup-button" onClick={onRemove} />
      </div>
    </Modal>
  )
}

export default React.memo(ModalRemoveVocabGroup)
