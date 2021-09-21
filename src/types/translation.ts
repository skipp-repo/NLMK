export interface TranslationRequest {
  q: string // поисковая фраза
  remember?: boolean // запомнить результат перевода в истории запросов пользователя (по умолчанию false)
  sourceLang?: string // не указывается, если нужно автоопределения
  targetLang?: string // если не указан, то по умолчанию - альтернативный sourceLang из пары ru/en
  filters?: {
    common?: boolean // общий перевод с помощью Google Translate
    glossaries?: number[] | boolean // поиск по глоссариям
    vocabs?: number[] | boolean // поиск по каталогам в моем словаре
    phrases?: boolean // нужно ли искать по фразам
    words?: boolean // нужно ли искать по отдельным словам
    matchType?: PhrasesMatchStatus[] // типы соответствия поисковой фразы карточкам перевода
  }
}

export enum PhrasesMatchStatus {
  exactMatch = 0, // точное соответствие поисковой строки карточке с переводом
  lemmaMatch = 1, // соответствие комбинации лемм слов (когда используются те же слова, но с использованием других словоформ, либо совпадает только часть слов)
  substringMatch = 2, // поисковая строка является подстрокой в найденных карточках перевода (вне зависимости от смысла слов)
  // могут быть включены meaningMatch, spellingMatch и т.д.
}

export interface PhraseTranslation {
  _id: number // идентификатор карточки перевода
  sourceLang: string // исходный язык
  targetLang: string // язык перевода
  text: string // исходная фраз
  translation: string // перевод
  glossaries?: number[] // идентификатор глоссария, из которого взята переведенная фраза (если null, или пустой массив то перевод общей лексики)
  phrase: boolean // признак фразы (если нет, то слово)
}

export interface OrthographicCorrection {
  from: number // начальная позиция корректировки в исходной поисковой фразе
  length: number // длина скорректированного текста
  correction: string // корректирующая подстрока
}

export interface TranslationResultItem {
  common: boolean // указывает, взять карточка из общей лексики или из глоссариев
  orthographicCorrectionApplied: boolean // указывает, была ли применена корректировка орфографии для данного результата
  matchingTokens?: string[] // показывает, по каким словам в исходной фразе карточки произошло совпадение с поисковой фразой - для подсветки матчинга
  matchState: PhrasesMatchStatus // вариант сопоставления карточки
  relevance: number // степень соответствия исходной поисковой фразы тексту карточки
  vocabId?: number // идентификатор словаря, в который помещена эта карточка (если null, то карточка не находится в закладках)
  translation: PhraseTranslation // содержание карточки с переводом
}

export interface TranslationResult {
  createdAt: string // дата
  searchPhrase: string // исходная поисковая фраза
  orthographicCorrections: OrthographicCorrection[] // корректировка поисковой фразы из запроса
  request: TranslationRequest // исходный запрос на перевод
  results: TranslationResultItem[][]
}

export type Glossary = {
  _id: string
  name: string
}

export interface PhraseTranslationLocal {
  _id: number // идентификатор карточки перевода
  sourceLang: string // исходный язык
  targetLang: string // язык перевода
  text: string // исходная фраз
  translation: string // перевод
  glossaries: Glossary[]
  phrase: boolean // признак фразы (если нет, то слово)
  images: string[]
  selected?: boolean
}

export interface TranslationResultItemLocal {
  common: boolean // указывает, взять карточка из общей лексики или из глоссариев
  orthographicCorrectionApplied: boolean // указывает, была ли применена корректировка орфографии для данного результата
  matchingTokens?: string[] // показывает, по каким словам в исходной фразе карточки произошло совпадение с поисковой фразой - для подсветки матчинга
  matchState: PhrasesMatchStatus // вариант сопоставления карточки
  relevance: number // степень соответствия исходной поисковой фразы тексту карточки
  vocabId?: number // идентификатор словаря, в который помещена эта карточка (если null, то карточка не находится в закладках)
  translation: PhraseTranslationLocal // содержание карточки с переводом
  images: string[]
  inBookmarks: boolean
}
