import React from 'react'
import './ModalNewVocabGroup.scss'
import Modal, { ModalProps } from '../Modal/Modal'
import ModalButton from '../Modal/ModalButton/ModalButton'
import ModalInput from '../Modal/ModalInput/ModalInput'
import ModalTitle from '../Modal/ModalTitle/ModalTitle'

export type ModalNewVocabGroupProps = ModalProps & {
  onCreate(name: string): void
}

const ModalNewVocabGroup: React.FC<ModalNewVocabGroupProps> = ({ onCreate, ...props }) => {
  const [name, setName] = React.useState()

  const handleChange = ({ target }) => {
    setName(target.value)
  }

  const handleSave = () => {
    onCreate(name)
  }

  return (
    <Modal {...props}>
      <ModalTitle>Добавить новую группу</ModalTitle>

      <div className="ModalNewVocabGroup-container">
        <ModalInput
          placeholder="Название группы"
          className="ModalNewVocabGroup-input"
          onChange={handleChange}
        />
        <ModalButton
          text="Создать группу"
          className="ModalNewVocabGroup-button"
          onClick={handleSave}
        />
      </div>
    </Modal>
  )
}

export default React.memo(ModalNewVocabGroup)
