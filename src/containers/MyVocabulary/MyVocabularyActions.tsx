import React from 'react'
import proschet from 'proschet'
import ItemsCount from '../../components/ItemsCount/ItemsCount'
import Checkbox from '../../components/Checkbox/Checkbox'
import Container from '../../components/Container/Container'
import IconButton from '../../components/IconButton/IconButton'
import { useSelector } from 'react-redux'
import * as vocabsSlices from '../../redux/slices/vocabs'
import * as userSlices from '../../redux/slices/user'
import { ReactComponent as DownloadIcon } from '../../assets/icons/download.svg'
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg'
import VocabsDropdown from '../../components/VocabsDropdown/VocabsDropdown'
import * as vocabsSlice from '../../redux/slices/vocabs'
import useReduxAction from '../../hooks/useReduxAction'

export type MyVocabularyActionsProps = JSX.IntrinsicElements['div'] & { activeTab: string }

const words = proschet(['слово', 'слова', 'слов'])

const MyVocabularyActions: React.FC<MyVocabularyActionsProps> = ({
  children,
  className,
  activeTab,
  ...props
}) => {
  const reduxAction = useReduxAction()
  const vocabsByID = useSelector(vocabsSlices.selectors.vocabById(activeTab))

  const vocabs = useSelector(userSlices.selectors.vocabs)
  const selectedIds = useSelector(vocabsSlice.selectors.selectedCardsIdsByVocabId(activeTab))

  const selectAll = reduxAction(vocabsSlice.selectAll)

  const [checkAll, setCheckAll] = React.useState<undefined | boolean>()
  const [vocabIdsForMoving, setVocabsIdsForMoving] = React.useState([])

  const fixedVocabs = React.useMemo(
    () =>
      vocabs
        .filter(({ _id }) => activeTab !== _id)
        .map(({ _id, name, ...item }) => {
          return {
            id: _id,
            name: item.default ? 'Default' : name,
            checked: vocabIdsForMoving.includes(_id),
          }
        }),
    [vocabs, activeTab, vocabIdsForMoving],
  )

  const handleSelectAll = ({ target }) => {
    setCheckAll(target.checked ? true : undefined)
    selectAll({ vocabId: activeTab, select: target.checked })
  }

  const handleUnselectAll = ({ target: { checked } }) => {
    setCheckAll(checked ? false : undefined)
    if (checked) {
      selectAll({ vocabId: activeTab, select: false })
    }
  }

  const handleSelectGroupForMoving = (id, checked) => {
    console.log('debug123 handleSelectGroupForMoving', id)

    if (checked) {
      setVocabsIdsForMoving((state) => [...state, id])
    } else {
      setVocabsIdsForMoving((state) => {
        return state.filter((stateId) => stateId !== id)
      })
    }
  }

  console.log(selectedIds)

  return (
    <Container className="MyVocabulary-actions">
      <ItemsCount className="MyVocabulary-actions-count">{`${vocabsByID?.cards.length} ${words(
        vocabsByID?.cards.length,
      )}`}</ItemsCount>

      <VocabsDropdown
        text="Переместить в группу"
        items={fixedVocabs}
        onSelect={handleSelectGroupForMoving}
        disabled={!selectedIds.length}
      />
      <Checkbox
        className="MyVocabulary-actions-button"
        text="Отметить все"
        secondary
        checked={checkAll}
        onChange={handleSelectAll}
      />
      <Checkbox
        className="MyVocabulary-actions-button"
        text="Снять все"
        secondary
        checked={checkAll === false}
        onChange={handleUnselectAll}
      />

      <IconButton
        className="MyVocabulary-actions-button"
        text="Удалить"
        Icon={DeleteIcon}
        disabled={!selectedIds.length}
      />
      <IconButton
        className="MyVocabulary-actions-button"
        text="Скачать группу"
        Icon={DownloadIcon}
      />
    </Container>
  )
}

export default React.memo(MyVocabularyActions)
