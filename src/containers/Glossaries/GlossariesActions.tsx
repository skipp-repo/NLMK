import React from 'react'
import proschet from 'proschet'
import { useAsyncCallback } from 'react-async-hook'
import { downloadGlossaryById } from '../../api/requests/downloadGlossaryById'
import ItemsCount from '../../components/ItemsCount/ItemsCount'
import Checkbox from '../../components/Checkbox/Checkbox'
import Container from '../../components/Container/Container'
import IconButton from '../../components/IconButton/IconButton'
import { useSelector } from 'react-redux'
import * as glossariesSlice from '../../redux/slices/glossaries'
import * as userSlice from '../../redux/slices/user'
import { ReactComponent as DownloadIcon } from '../../assets/icons/download.svg'
import VocabsDropdown from '../../components/VocabsDropdown/VocabsDropdown'
import * as vocabsSlice from '../../redux/slices/vocabs'
import useReduxAction from '../../hooks/useReduxAction'

export type GlossariesProps = JSX.IntrinsicElements['div'] & { activeTab: number }

const words = proschet(['слово', 'слова', 'слов'])

const GlossariesActions: React.FC<GlossariesProps> = ({
  children,
  className,
  activeTab,
  ...props
}) => {
  const reduxAction = useReduxAction()
  const glossaryById = useSelector(glossariesSlice.selectors.glossaryById(activeTab))

  const vocabs = useSelector(vocabsSlice.selectors.vocabsList)

  const selectedIds = useSelector(glossariesSlice.selectors.selectedCardsIdsByVocabId(activeTab))

  const [checkAll, setCheckAll] = React.useState<undefined | boolean>()
  const [vocabIdsForMoving, setVocabsIdsForMoving] = React.useState([])

  const editFolder = reduxAction(vocabsSlice.editFolder)
  const selectAll = reduxAction(glossariesSlice.selectAll)

  const token = useSelector(userSlice.selectors.token)

  const downloadCurrentVocab = useAsyncCallback(async (id) => {
    return await downloadGlossaryById({ token, id })
  })

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
    selectAll({ glossaryId: activeTab, select: target.checked })
  }

  const handleUnselectAll = ({ target: { checked } }) => {
    setCheckAll(checked ? false : undefined)
    if (checked) {
      selectAll({ glossaryId: activeTab, select: false })
    }
  }

  const handleSelectGroupForMoving = (id, checked) => {
    if (checked) {
      setVocabsIdsForMoving((state) => [...state, id])

      editFolder({ id: activeTab, cardsToRemove: selectedIds })
      editFolder({ id, cardsToAdd: selectedIds })

      setTimeout(() => {
        setVocabsIdsForMoving([])
      }, 500)
    } else {
      setVocabsIdsForMoving((state) => {
        return state.filter((stateId) => stateId !== id)
      })
    }
  }

  const handleDownloadVocab = () => {
    downloadCurrentVocab.execute(activeTab)
  }

  React.useEffect(() => {
    setCheckAll(undefined)
  }, [activeTab])

  return (
    <Container className="Glossaries-actions">
      <ItemsCount className="Glossaries-actions-count">{`${glossaryById?.cards?.length} ${words(
        glossaryById?.cards?.length,
      )}`}</ItemsCount>

      <VocabsDropdown
        text="Переместить в группу"
        items={fixedVocabs}
        onSelect={handleSelectGroupForMoving}
        disabled={!selectedIds.length}
      />
      <Checkbox
        className="Glossaries-actions-button"
        text="Отметить все"
        secondary
        checked={checkAll}
        onChange={handleSelectAll}
      />
      <Checkbox
        className="Glossaries-actions-button"
        text="Снять все"
        secondary
        checked={checkAll === false}
        onChange={handleUnselectAll}
      />
      <IconButton
        className="Glossaries-actions-button"
        text="Скачать"
        Icon={DownloadIcon}
        onClick={handleDownloadVocab}
      />
    </Container>
  )
}

export default React.memo(GlossariesActions)
