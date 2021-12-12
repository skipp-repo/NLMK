import useModal from './useModal'
import ModalNewVocabGroup from '../components/ModalNewVocabGroup/ModalNewVocabGroup'
import React from 'react'
import * as vocabsSlice from '../redux/slices/vocabs'
import useReduxAction from './useReduxAction'

export default () => {
  const [newGroupPopupVisible, showNewGroupPopup, hideNewGroupPopup] = useModal()

  const reduxAction = useReduxAction()
  const createFolder = reduxAction(vocabsSlice.createFolder)

  const handleCreateNewGroup = (name) => {
    createFolder({ name })
    hideNewGroupPopup()
  }

  const createNewGroupModalComponent = (
    <ModalNewVocabGroup
      visible={newGroupPopupVisible}
      onCreate={handleCreateNewGroup}
      onClose={hideNewGroupPopup}
    />
  )

  return {
    newGroupPopupVisible,
    showNewGroupPopup,
    hideNewGroupPopup,
    createNewGroupModalComponent,
  }
}
