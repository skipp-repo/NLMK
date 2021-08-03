import { PhraseTranslation } from './translation'

export interface Vocab {
  _id: number
  createdAt: Date // дата создания
  name: string // имя папки
  cards: [
    {
      added: Date //дата добавления карточки в словарь,
      card: PhraseTranslation
    },
  ]
}
