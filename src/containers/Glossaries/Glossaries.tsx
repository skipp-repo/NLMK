import React from 'react'
import { useAsyncCallback } from 'react-async-hook'
import { useSelector } from 'react-redux'
import useTitle from 'react-use/lib/useTitle'
import { useDebouncedCallback } from 'use-debounce'
import { downloadAllGlossarys as downloadAllGlossarysRequest } from '../../api/requests/downloadAllGlossaries'
import Container from '../../components/Container/Container'
import DownloadLink from '../../components/DownloadLink/DownloadLink'
import PageTitle from '../../components/PageTitle/PageTitle'
import Search from '../../components/Search/Search'
import Tabs from '../../components/Tabs/Tabs'
import TranslationCardSelectable from '../../components/TranslationCard/TranslationCardSelectable/TranslationCardSelectable'
import VocabsFilters from '../../components/VocabsFilters/VocabsFilters'
import useReduxAction from '../../hooks/useReduxAction'
import * as appSlice from '../../redux/slices/app'
import * as glossariesSlice from '../../redux/slices/glossaries'
import * as translationSlice from '../../redux/slices/translation'
import { SpaceEnum, Translate } from '../../redux/slices/translation'
import { glossariesSearchResults } from '../../redux/slices/translation/selectors'
import * as userSlice from '../../redux/slices/user'
import './Glossaries.scss'
import GlossariesActions from './GlossariesActions'

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
    vocabs: false,
  })
  const glossaries = useSelector(glossariesSlice.selectors.glossariesList)
  const glossaryById = useSelector(glossariesSlice.selectors.glossaryById(activeTab))

  const token = useSelector(userSlice.selectors.token)

  const selectCard = reduxAction(glossariesSlice.selectCard)
  const selectAll = reduxAction(glossariesSlice.selectAll)

  const getData = reduxAction(appSlice.getData)
  const search = reduxAction((params: Omit<Translate, 'space'>) =>
    translationSlice.translate({ space: SpaceEnum.Glossaries, ...params }),
  )
  const getGlossary = reduxAction(glossariesSlice.getGlossary)

  const debouncedSearch = useDebouncedCallback(search, 300)
  const downloadAllGlossarys = useAsyncCallback(async () => {
    const glossaryIds = glossaries.map(({ _id }) => _id)

    return await downloadAllGlossarysRequest({ token, glossaryIds })
  })

  const searchData = useSelector(translationSlice.selectors.glossariesSearchResults)

  const needShowSearchResults = query.length > 0

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

  const tabs = glossaries.map(({ _id, name }) => ({
    name: name || 'name',
    id: _id,
  }))

  const handleCardSelect = (cardId: number, selected: boolean) => {
    selectCard({ glossaryId: activeTab, cardId, selected })
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

  const handleTabChange = (id) => {
    setActiveTab(id)
    getGlossary({ id })
    selectAll({ glossaryId: activeTab, select: false })
  }

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
    if (glossaries?.length && !activeTab) {
      setActiveTab(glossaries[0]._id)
    }
  }, [glossaries])

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

        <DownloadLink onClick={downloadAllGlossarys.execute}>Скачать все слова</DownloadLink>
      </Container>
      <Container className="Glossaries-tabs">
        <Tabs tabs={tabs} onChange={handleTabChange} />
      </Container>

      {glossaryById?.cards?.length !== undefined && <GlossariesActions activeTab={activeTab} />}

      <Container className="Glossaries-search">
        <Search className="Glossaries-search-input" onChange={handleSearch} suggestions={[]} />

        <VocabsFilters
          className="Glossaries-search-filter"
          items={filtersData}
          onSelect={handleChangeFilter}
        />
      </Container>

      {!!glossaryById?.cards?.length && !needShowSearchResults && (
        <Container className="Glossaries-cards">{glossaryById.cards.map(renderCard)}</Container>
      )}

      {needShowSearchResults && (
        <Container className="Glossaries-cards">
          {searchData?.results?.length ? searchData?.results?.map(renderCard) : 'Ничего не найдено'}
        </Container>
      )}
    </div>
  )
}

export default React.memo(Glossaries)
