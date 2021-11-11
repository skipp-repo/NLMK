import React from 'react'
import { useSelector } from 'react-redux'
import { useDebouncedCallback } from 'use-debounce'
import AddWordsPanel from '../../components/AddWordsPanel/AddWordsPanel'
import useReduxAction from '../../hooks/useReduxAction'
import { Translate } from '../../redux/slices/translation'
import * as translationSlice from '../../redux/slices/translation'
import * as userSlice from '../../redux/slices/user'
import { Filters } from '../../types/filters'

export type MyVocabsPanelProps = {}

const searchFiltersReducer = (state, action) => {
  switch (action.type) {
    case 'WordsAndPhrases':
      return { ...state, words: action.selected, phrases: action.selected }
    case 'Words': {
      return { ...state, words: action.selected, phrases: false }
    }
    case 'Phrases':
      return { ...state, words: false, phrases: action.selected }
    case 'Vocabs': {
      let vocabs = state.vocabs

      if (Array.isArray(vocabs)) {
        if (action.selected) {
          vocabs = [...vocabs, action.data.id]
        } else {
          vocabs = vocabs.filter((id) => id !== action.data.id)

          if (!vocabs.length) {
            vocabs = true
          }
        }
      } else {
        if (action.selected) {
          vocabs = [action.data.id]
        }
      }

      return { ...state, vocabs }
    }
    default:
      return state
  }
}

const VocabsPanel: React.FC<MyVocabsPanelProps> = ({ ...props }) => {
  const reduxAction = useReduxAction()

  const [query, setQuery] = React.useState('')

  const [searchFilters, searchFiltersDispatch] = React.useReducer(searchFiltersReducer, {
    glossaries: true,
    phrases: true,
    words: true,
    vocabs: true,
    common: true,
  })

  const { getStatusLoading } = useSelector(userSlice.selectors.flags)
  const { translateLoading } = useSelector(translationSlice.selectors.translationFlags)
  const vocabs = useSelector(userSlice.selectors.vocabs)
  const translationData = useSelector(translationSlice.selectors.documentsVocabsSearchResults)
  const translationHistory = useSelector(userSlice.selectors.history)

  const search = reduxAction((params: Omit<Translate, 'space'>) =>
    translationSlice.translate({ space: 'DocumentsVocabs', ...params }),
  )

  const vocabsFilters = React.useMemo(
    () =>
      vocabs.map(({ _id, name, ...item }) => {
        let selected

        if (Array.isArray(searchFilters.glossaries)) {
          selected = searchFilters.glossaries.includes(_id)
        } else {
          selected = false
        }

        return {
          type: 'Vocabs',
          key: `Vocabs-${_id}`,
          data: { id: _id },
          name: name || 'Default',
          selected,
        }
      }),
    [vocabs, searchFilters.glossaries],
  )

  const filters: Filters = [
    {
      name: 'Тип поиска',
      items: [
        {
          type: 'WordsAndPhrases',
          key: 'WordsAndPhrases',
          name: 'Слова и фразы',
          selected: searchFilters.phrases && searchFilters.words,
        },
        {
          type: 'Words',
          key: 'Words',
          name: 'Только слова',

          selected: searchFilters.words && !searchFilters.phrases,
        },
        {
          type: 'Phrases',
          key: 'Phrases',
          name: 'Только фразы',
          selected: searchFilters.phrases && !searchFilters.words,
        },
      ],
    },
    {
      name: 'Группа',
      items: vocabsFilters,
    },
  ]
  const isLoading = (!translationHistory?.length && getStatusLoading) || translateLoading

  const handleAdd = () => {}

  const handleChangeFilter = ({ type, selected, data }) => {
    searchFiltersDispatch({ type, selected, data })
  }

  const handleSearch = (text) => {
    setQuery(text)
  }

  const debouncedSearch = useDebouncedCallback(search, 300)

  React.useEffect(() => {
    if (query) {
      debouncedSearch({
        query,
        filters: {
          common: false,
          ...searchFilters,
        },
      })
    }
  }, [searchFilters, query])

  return (
    <AddWordsPanel
      title="Мой словарь"
      description="Вставляйте слова и фразы из своего словаря прямо в документ"
      filters={filters}
      translationData={translationData}
      historyData={translationHistory}
      isLoading={isLoading}
      onAdd={handleAdd}
      onSearch={handleSearch}
      onChangeFilter={handleChangeFilter}
      {...props}
    />
  )
}

export default React.memo(VocabsPanel)
