import React from 'react'
import Provider from '../../containers/Provider/Provider'
import './Popup.css'
import PopupHeader from '../../containers/PopupHeader/PopupHeader'
import PopupSearch from '../../components/PopupSearch/PopupSearch'
import TranslationCard from '../../components/TranslationCard/TranslationCard'

type CardProp = {
  input: string
  word: string
  translations: string[]
  image: string | undefined
  glossaries: string[]
  inBookmarks: boolean
}

const cards: CardProp[] = [
  {
    input: 'Sell',
    word: 'Sell',
    translations: ['Продавать'],
    image:
      'https://images.unsplash.com/photo-1625242824625-8ad744a64a55?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    glossaries: ['Сталелитейное производство', 'Доменное производство'],
    inBookmarks: true,
  },
  {
    input: 'Sell',
    word: 'Sell out',
    translations: ['Торговать'],
    image: undefined,
    glossaries: ['Сталелитейное производство', 'Доменное производство'],
    inBookmarks: false,
  },
]

const Popup = () => {
  const handleOpenMain = () => window.open('main.html')

  const handleSpeech = () => {}

  const renderCard = ({ input, word, translations, image, glossaries, inBookmarks }: CardProp) => {
    return (
      <TranslationCard
        className="Popup-cards-list-item"
        input={input}
        word={word}
        translations={translations}
        image={image}
        glossaries={glossaries}
        inBookmarks={inBookmarks}
        onSpeech={handleSpeech}
        speech
      />
    )
  }

  return (
    <Provider>
      <PopupHeader className="Popup-header" />

      <div className="Popup-container">
        <PopupSearch className="Popup-search" />

        <div className="Popup-cards">
          <div className="Popup-cards-item">
            <div className="Popup-cards-title">Недавно просмотрено</div>

            <div className="Popup-cards-list">{cards.map(renderCard)}</div>
          </div>
        </div>
      </div>
    </Provider>
  )
}

export default React.memo(Popup)
