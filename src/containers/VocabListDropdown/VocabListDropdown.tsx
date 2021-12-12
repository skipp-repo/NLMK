import React from 'react'
import './VocabListDropdown.scss'
import VocabsDropdown, { ItemType } from '../../components/VocabsDropdown/VocabsDropdown'
import { useSelector } from 'react-redux'
import * as vocabsSlice from '../../redux/slices/vocabs'
import useCreateNewGroupPopup from '../../hooks/useCreateNewGroupPopup'

export type VocabListDropdownProps = {
  className?: string
  activeTab: number
  vocabIdsForMoving: number[]
  disabled: boolean
  onSelect(id: number, checked: boolean): void
}

const ADD_ACTION = 'add-action'

const VocabListDropdown: React.FC<VocabListDropdownProps> = ({
  className,
  activeTab,
  vocabIdsForMoving,
  disabled,
  onSelect,
}) => {
  const dropdownVocabs = useSelector(
    vocabsSlice.selectors.dropdownVocabs(activeTab, vocabIdsForMoving),
  )

  const { showNewGroupPopup, createNewGroupModalComponent } = useCreateNewGroupPopup()

  const options = [
    ...dropdownVocabs,
    { id: ADD_ACTION, name: '+ Создать группу', type: ItemType.action },
  ]

  const handleSelect = (id, checked) => {
    if (id === ADD_ACTION) {
      showNewGroupPopup()
    } else {
      onSelect(id, checked)
    }
  }

  return (
    <>
      <VocabsDropdown
        className={className}
        text="Переместить в группу"
        items={options}
        onSelect={handleSelect}
        disabled={disabled}
      />
      {createNewGroupModalComponent}
    </>
  )
}

export default React.memo(VocabListDropdown)
