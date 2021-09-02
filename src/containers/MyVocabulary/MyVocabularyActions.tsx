import React from 'react'
import clsx from 'clsx'
import ItemsCount from '../../components/ItemsCount/ItemsCount'
import Checkbox from '../../components/Checkbox/Checkbox'
import Container from '../../components/Container/Container'
import { useSelector } from 'react-redux'
import * as vocabsSlices from '../../redux/slices/vocabs'

export type MyVocabularyActionsProps = JSX.IntrinsicElements['div'] & {}

const MyVocabularyActions: React.FC<MyVocabularyActionsProps> = ({
  children,
  className,
  ...props
}) => {
  const vocabsByID = useSelector(vocabsSlices.selectors.vocabById(activeTab))

  return (
    <Container className="MyVocabulary-actions">
      <ItemsCount>{`${vocabsByID?.cards.length} ${words(vocabsByID?.cards.length)}`}</ItemsCount>

      <Checkbox text="Отметить все" secondary />
      <Checkbox text="Снять все" secondary />
    </Container>
  )
}

export default React.memo(MyVocabularyActions)
