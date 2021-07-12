import React from 'react'
import useCollapse from 'react-collapsed'
import Provider from '../../containers/Provider/Provider'
import './Popup.css'
import PopupHeader from '../../containers/PopupHeader/PopupHeader'
import PopupSearch from '../../components/PopupSearch/PopupSearch'
import TranslationCard from '../../components/TranslationCard/TranslationCard'
import Loader from '../../components/Loader/Loader'
import TrainingSlider from '../../components/TrainingSlider/TrainingSlider'

type CardProp = {
  input: string
  word: string
  translation:
    | string
    | {
        image: string
        translation: string
        inBookmarks: boolean
      }[]
  image: string | undefined
  glossaries: string[]
  inBookmarks: boolean
}

const cards: CardProp[] = [
  {
    input: 'Sell',
    word: 'Sell',
    translation: 'Продавать',
    image:
      'https://images.unsplash.com/photo-1625242824625-8ad744a64a55?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    glossaries: ['Сталелитейное производство', 'Доменное производство'],
    inBookmarks: true,
  },
  {
    input: 'Sell',
    word: 'Sell out',
    translation: 'Торговать',
    image: undefined,
    glossaries: ['Сталелитейное производство', 'Доменное производство'],
    inBookmarks: false,
  },
  {
    input: 'Lif',
    word: 'Life',
    translation: [
      {
        translation: 'Жизнь',
        image:
          'https://images.unsplash.com/photo-1625242824625-8ad744a64a55?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        inBookmarks: false,
      },
      {
        translation: 'образ жизни',
        image:
          'https://images.unsplash.com/photo-1625242824625-8ad744a64a55?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        inBookmarks: false,
      },
      {
        translation: 'срок службы',
        image:
          'https://images.unsplash.com/photo-1625242824625-8ad744a64a55?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        inBookmarks: false,
      },
    ],
    image: undefined,
    glossaries: ['Доменное производство'],
    inBookmarks: false,
  },
]

const Popup = () => {
  const handleOpenMain = () => window.open('main.html')
  const { getCollapseProps, getToggleProps } = useCollapse({
    defaultExpanded: true,
  })

  const handleSpeech = () => {}

  const renderCard = ({ input, word, translation, image, glossaries, inBookmarks }: CardProp) => {
    return (
      <TranslationCard
        className="Popup-cards-list-item"
        input={input}
        word={word}
        translation={translation}
        image={image}
        glossaries={glossaries}
        inBookmarks={inBookmarks}
        onSpeech={handleSpeech}
        speech
      />
    )
  }

  const handleClose = () => {
    console.log('close')
    // setExpanded((prevExpanded) => !prevExpanded)
  }

  return (
    <Provider>
      <PopupHeader className="Popup-header" />

      <div className="Popup-container">
        <PopupSearch className="Popup-search" />

        <TrainingSlider {...getCollapseProps()} toggleProps={getToggleProps()} />

        {/*<div className="Popup-empty">Вбейте слово в поиск, чтобы увидеть его перевод</div>*/}

        {/*<Loader />*/}

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
