import React from 'react'
import './ModalRemoveVocabGroup.scss'
import Modal, { ModalProps } from '../Modal/Modal'
import ModalButton from '../Modal/ModalButton/ModalButton'
import ModalTitle from '../Modal/ModalTitle/ModalTitle'

export type ModalRemoveVocabGroupProps = ModalProps & {}

const ModalRemoveVocabGroup: React.FC<ModalRemoveVocabGroupProps> = ({ ...props }) => {
  return (
    <Modal {...props}>
      <ModalTitle>Удалить группу?</ModalTitle>

      <div className="ModalRemoveVocabGroup-container">
        <ModalButton text="ОТМЕНА" className="ModalRemoveVocabGroup-button" secondary />
        <ModalButton text="УДАЛИТЬ" className="ModalRemoveVocabGroup-button" />
      </div>
    </Modal>
  )
}

export default React.memo(ModalRemoveVocabGroup)
