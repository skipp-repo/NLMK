import React from 'react'
import './ModalRenameVocabGroup.scss'
import Modal, { ModalProps } from '../Modal/Modal'
import ModalButton from '../Modal/ModalButton/ModalButton'
import ModalInput from '../Modal/ModalInput/ModalInput'
import ModalTitle from '../Modal/ModalTitle/ModalTitle'

export type ModalRenameVocabGroupProps = ModalProps & {
  name: string
  onChange(newName: string): void
}

const ModalRenameVocabGroup: React.FC<ModalRenameVocabGroupProps> = ({
  name,
  onChange,
  ...props
}) => {
  const [value, setValue] = React.useState('')

  const handleChange = ({ target }) => {
    setValue(target.value)
  }

  const handleSave = () => {
    onChange(value)
  }

  React.useEffect(() => {
    setValue(name)
  }, [name])

  return (
    <Modal {...props}>
      <ModalTitle>Изменить название группы</ModalTitle>

      <div className="ModalRenameVocabGroup-container">
        <ModalInput
          placeholder="Название группы"
          className="ModalRenameVocabGroup-input"
          value={value}
          onChange={handleChange}
        />
        <ModalButton
          text="ИЗМЕНИТЬ"
          className="ModalRenameVocabGroup-button"
          onClick={handleSave}
        />
      </div>
    </Modal>
  )
}

export default React.memo(ModalRenameVocabGroup)
