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

export type MyVocabularyActionsProps = JSX.IntrinsicElements['div'] & { activeTab: string }

const words = proschet(['слово', 'слова', 'слов'])

const MyVocabularyActions: React.FC<MyVocabularyActionsProps> = ({
  children,
  className,
  activeTab,
  ...props
}) => {
  const vocabsByID = useSelector(vocabsSlices.selectors.vocabById(activeTab))

  const vocabs = useSelector(userSlices.selectors.vocabs)

  const fixedVocabs = React.useMemo(
    () =>
      vocabs.map(({ _id, name, ...item }) => ({ id: _id, name: item.default ? 'Default' : name })),
    [vocabs],
  )

  return (
    <Container className="MyVocabulary-actions">
      <ItemsCount className="MyVocabulary-actions-count">{`${vocabsByID?.cards.length} ${words(
        vocabsByID?.cards.length,
      )}`}</ItemsCount>

      <VocabsDropdown text="Переместить в группу" items={fixedVocabs} />
      <Checkbox className="MyVocabulary-actions-button" text="Отметить все" secondary />
      <Checkbox className="MyVocabulary-actions-button" text="Снять все" secondary />

      <IconButton className="MyVocabulary-actions-button" text="Удалить" Icon={DeleteIcon} />
      <IconButton
        className="MyVocabulary-actions-button"
        text="Скачать группу"
        Icon={DownloadIcon}
      />
    </Container>
  )
}

export default React.memo(MyVocabularyActions)
