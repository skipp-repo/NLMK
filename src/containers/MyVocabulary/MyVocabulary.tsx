import React from 'react'
import Container from '../../components/Container/Container'
import PageTitle from '../../components/PageTitle/PageTitle'
import DownloadLink from '../../components/DownloadLink/DownloadLink'
import Button from '../../components/Button/Button'
import './MyVocabulary.scss'

export type MyVocabularyProps = {}

const title = 'Мой словарь'

const MyVocabulary: React.FC<MyVocabularyProps> = ({ children }) => {
  React.useEffect(() => {
    document.title = title
  }, [])

  return (
    <div className="MyVocabulary">
      <Container className="MyVocabulary-header">
        <PageTitle className="MyVocabulary-title">{title}</PageTitle>

        <DownloadLink>Скачать все слова</DownloadLink>

        <Button className="MyVocabulary-button">СОЗДАТЬ ГРУППУ</Button>
      </Container>
      MyVocabulary
    </div>
  )
}

export default React.memo(MyVocabulary)
