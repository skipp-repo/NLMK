import React from 'react'
import { useSelector } from 'react-redux'
import { useDebouncedCallback } from 'use-debounce'
import AddWordsPanel from '../../components/AddWordsPanel/AddWordsPanel'
import useReduxAction from '../../hooks/useReduxAction'
import * as glossariesSlice from '../../redux/slices/glossaries'
import * as translationSlice from '../../redux/slices/translation'
import { SpaceEnum, Translate } from '../../redux/slices/translation'
import * as userSlice from '../../redux/slices/user'
import { Filters } from '../../types/filters'
import { glossariesFiltersReducer } from './reducers'

export type VocabPanelProps = {
  className: string
  onAdd(word: string): void
}

const GlossariesPanel: React.FC<VocabPanelProps> = ({ onAdd, ...props }) => {
  const reduxAction = useReduxAction()

  const [query, setQuery] = React.useState('')

  const [searchFilters, searchFiltersDispatch] = React.useReducer(glossariesFiltersReducer, {
    glossaries: true,
    phrases: true,
    words: true,
    vocabs: false,
    common: false,
  })

  const { getStatusLoading } = useSelector(userSlice.selectors.flags)
  const { translateLoading } = useSelector(translationSlice.selectors.translationFlags)
  const glossaries = useSelector(glossariesSlice.selectors.glossariesList)
  const searchData = useSelector(translationSlice.selectors.documentsGlossariesSearchResults)

  const search = reduxAction((params: Omit<Translate, 'space'>) =>
    translationSlice.translate({ space: SpaceEnum.DocumentsGlossaries, ...params }),
  )

  const glossariesFilterList = React.useMemo(
    () =>
      glossaries.map(({ _id, name, ...item }) => {
        let selected

        if (Array.isArray(searchFilters.glossaries)) {
          selected = searchFilters.glossaries.includes(_id)
        } else {
          selected = false
        }

        return {
          type: 'Glossary',
          key: `Glossary-${_id}`,
          data: { id: _id },
          name: name,
          selected,
        }
      }),
    [glossaries, searchFilters.glossaries],
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
      name: 'Глоссарий',
      items: glossariesFilterList,
    },
  ]

  const isLoading = getStatusLoading || translateLoading

  const handleAdd = (word) => {
    onAdd(word)
  }

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
          ...searchFilters,
        },
        remember: true,
      })
    }
  }, [searchFilters, query])

  return (
    <AddWordsPanel
      title="Глоссарий"
      description="Вставляйте слова и фразы из большой базы данных перевода компании"
      filters={filters}
      translationData={searchData}
      isLoading={isLoading}
      query={query}
      onAdd={handleAdd}
      onSearch={handleSearch}
      onChangeFilter={handleChangeFilter}
      {...props}
    />
  )
}

export default React.memo(GlossariesPanel)
