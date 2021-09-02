import React from 'react'
import proschet from 'proschet'
import ItemsCount from '../../components/ItemsCount/ItemsCount'
import Checkbox from '../../components/Checkbox/Checkbox'
import Container from '../../components/Container/Container'
import IconButton from '../../components/IconButton/IconButton'
import { useSelector } from 'react-redux'
import * as vocabsSlices from '../../redux/slices/vocabs'
import { ReactComponent as DownloadIcon } from '../../assets/icons/download.svg'
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg'

export type MyVocabularyActionsProps = JSX.IntrinsicElements['div'] & { activeTab: string }

const words = proschet(['слово', 'слова', 'слов'])

const MyVocabularyActions: React.FC<MyVocabularyActionsProps> = ({
  children,
  className,
  activeTab,
  ...props
}) => {
  const vocabsByID = useSelector(vocabsSlices.selectors.vocabById(activeTab))

  return (
    <Container className="MyVocabulary-actions">
      <ItemsCount className="MyVocabulary-actions-count">{`${vocabsByID?.cards.length} ${words(
        vocabsByID?.cards.length,
      )}`}</ItemsCount>

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
