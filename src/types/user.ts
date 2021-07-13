import { TranslationResult } from './translation'

export interface UserStatus {
  _id: number // уникальный пользовательский идентификатор
  createdAt: string
  lastActivity: string
  translationHistory: TranslationResult[] // история перевода слов
  vocabs: { _id: number; name: string } // перечень папок моего словаря
  documents: { _id: number; name: string } // перечень моих документов
  glossaries: { _id: number; name: string } // перечень доступных глоссариев
  newUser: boolean // флаг указывает, что пользователь только что был зарегистрирован
}
