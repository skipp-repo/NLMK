import React from 'react'
import './ModalNewVocabGroup.scss'
import Modal, { ModalProps } from '../Modal/Modal'
import ModalButton from '../Modal/ModalButton/ModalButton'
import ModalInput from '../Modal/ModalInput/ModalInput'
import ModalTitle from '../Modal/ModalTitle/ModalTitle'

export type ModalNewVocabGroupProps = ModalProps & {}

const ModalNewVocabGroup: React.FC<ModalNewVocabGroupProps> = ({ ...props }) => {
  return (
    <Modal {...props}>
      <ModalTitle>Добавить новую группу</ModalTitle>

      <div className="ModalNewVocabGroup-container">
        <ModalInput placeholder="Название группы" className="ModalNewVocabGroup-input" />
        <ModalButton text="Создать группу" className="ModalNewVocabGroup-button" />
      </div>
    </Modal>
  )
}

export default React.memo(ModalNewVocabGroup)
