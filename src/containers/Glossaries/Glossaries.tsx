import React from 'react'
import { useAsyncCallback } from 'react-async-hook'
import useTitle from 'react-use/lib/useTitle'
import { useSelector } from 'react-redux'
import { useDebouncedCallback } from 'use-debounce'
import { downloadAllVocabs as downloadAllVocabsRequest } from '../../api/requests/downloadAllVocabs'
import Container from '../../components/Container/Container'
import PageTitle from '../../components/PageTitle/PageTitle'
import DownloadLink from '../../components/DownloadLink/DownloadLink'
import Tabs from '../../components/Tabs/Tabs'
import TranslationCardSelectable from '../../components/TranslationCard/TranslationCardSelectable/TranslationCardSelectable'
import './Glossaries.scss'
import useReduxAction from '../../hooks/useReduxAction'
import * as userSlice from '../../redux/slices/user'
import * as vocabsSlice from '../../redux/slices/vocabs'
import * as appSlice from '../../redux/slices/app'
import GlossariesActions from './GlossariesActions'
import Search from '../../components/Search/Search'
import VocabsFilters from '../../components/VocabsFilters/VocabsFilters'
import * as translationSlice from '../../redux/slices/translation'
import { Translate } from '../../redux/slices/translation'

export type GlossariesProps = {}

const title = 'Глоссарии НМЛК'

const searchFiltersReducer = (state, action) => {
  switch (action.type) {
    case 'WordsAndPhrases':
      return { ...state, words: action.selected, phrases: action.selected }
    case 'Words': {
      return { ...state, words: action.selected, phrases: false }
    }
    case 'Phrases':
      return { ...state, words: false, phrases: action.selected }
    case 'Glossary': {
      let glossaries = state.glossaries

      if (Array.isArray(glossaries)) {
        if (action.selected) {
          glossaries = [...glossaries, action.data.id]
        } else {
          glossaries = glossaries.filter((id) => id !== action.data.id)

          if (!glossaries.length) {
            glossaries = true
          }
        }
      } else {
        if (action.selected) {
          glossaries = [action.data.id]
        }
      }

      return { ...state, glossaries }
    }
    default:
      return state
  }
}

const Glossaries: React.FC<GlossariesProps> = () => {
  const reduxAction = useReduxAction()

  const [query, setQuery] = React.useState('')
  const [activeTab, setActiveTab] = React.useState()

  const [searchFilters, searchFiltersDispatch] = React.useReducer(searchFiltersReducer, {
    glossaries: true,
    phrases: true,
    words: true,
    vocabs: true,
  })

  const vocabsByID = useSelector(vocabsSlice.selectors.vocabById(activeTab))
  const vocabs = useSelector(vocabsSlice.selectors.vocabsList)
  const token = useSelector(userSlice.selectors.token)
  const glossaries = useSelector(userSlice.selectors.glossaries)

  const selectCard = reduxAction(vocabsSlice.selectCard)
  const getData = reduxAction(appSlice.getData)
  const search = reduxAction((params: Omit<Translate, 'space'>) =>
    translationSlice.translate({ space: 'MainVocabs', ...params }),
  )
  const debouncedSearch = useDebouncedCallback(search, 300)
  const downloadAllVocabs = useAsyncCallback(async () => {
    return await downloadAllVocabsRequest({ token })
  })

  const searchData = useSelector(translationSlice.selectors.mainVocabsSearchResults)

  const needShowSearchResults = !!searchData?.results?.length && query.length > 0

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

  const filtersData = [
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

  const tabs = vocabs.map(({ _id, name }) => ({
    name: name || 'default',
    id: _id,
  }))

  const handleCardSelect = (cardId: number, selected: boolean) => {
    selectCard({ vocabId: activeTab, cardId, selected })
  }

  const renderCard = (data) => {
    return (
      <TranslationCardSelectable
        key={data._id}
        className={'Glossaries-card'}
        item={data}
        speech
        onSpeech={handleSpeech}
        onSelect={handleCardSelect}
      />
    )
  }

  const handleSpeech = () => {}

  const handleTabChange = (id) => setActiveTab(id)

  const handleSearch = (text) => {
    setQuery(text)
  }

  const handleChangeFilter = ({ type, selected, data }) => {
    searchFiltersDispatch({ type, selected, data })
  }

  useTitle(title)

  React.useEffect(() => {
    getData()
  }, [])

  React.useEffect(() => {
    if (vocabs?.length && !activeTab) {
      setActiveTab(vocabs[0]._id)
    }
  }, [vocabs])

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
    <div className="Glossaries">
      <Container className="Glossaries-header">
        <PageTitle className="Glossaries-title">{title}</PageTitle>

        <DownloadLink onClick={downloadAllVocabs.execute}>Скачать все слова</DownloadLink>
      </Container>
      <Container className="Glossaries-tabs">
        <Tabs tabs={tabs} onChange={handleTabChange} />
      </Container>

      {vocabsByID?.cards?.length !== undefined && <GlossariesActions activeTab={activeTab} />}

      <Container className="Glossaries-search">
        <Search className="Glossaries-search-input" onChange={handleSearch} suggestions={[]} />

        <VocabsFilters
          className="Glossaries-search-filter"
          items={filtersData}
          onSelect={handleChangeFilter}
        />
      </Container>

      {!!vocabsByID?.cards?.length && !needShowSearchResults && (
        <Container className="Glossaries-cards">{vocabsByID.cards.map(renderCard)}</Container>
      )}

      {needShowSearchResults && (
        <Container className="Glossaries-cards">{searchData.results.map(renderCard)}</Container>
      )}
    </div>
  )
}

export default React.memo(Glossaries)
