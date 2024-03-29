import React from 'react'
import clsx from 'clsx'
import './AddWordsPanel.scss'
import useCollapse from 'react-collapsed'
import { ReactComponent as ArrowIcon } from '../../assets/icons/arrow-2.svg'
import { Filters } from '../../types/filters'
import Loader from '../Loader/Loader'
import Search from '../Search/Search'
import TranslationListTitle from '../TranslationListTitle/TranslationListTitle'
import AddWordsFilters from './AddWordsFilters/AddWordsFilters'
import AddWordsItem from './AddWordsItem/AddWordsItem'

export type AddWordsPanelProps = JSX.IntrinsicElements['div'] & {
  title: string
  description: string
  filters: Filters
  isLoading: boolean
  translationData: any
  historyData?: any[]
  query: string
  onAdd(word: string): void
  onSearch(newValue: string): void
  onChangeFilter({ type, selected, data }): void
}

const AddWordsPanel: React.FC<AddWordsPanelProps> = ({
  query,
  title,
  description,
  className,
  filters,
  isLoading,
  translationData,
  historyData,
  onSearch,
  onAdd,
  onChangeFilter,
  ...props
}) => {
  const { getCollapseProps, getToggleProps } = useCollapse()

  const handleAdd = (word) => {
    onAdd(word)
  }

  const renderTranslationCard = (data, index) => {
    return (
      <AddWordsItem
        key={`translation-${index}`}
        className="AddWordsPanel-list-item"
        items={data}
        speech
        onAdd={handleAdd}
      />
    )
  }

  const renderHistoryCard = React.useCallback(
    ({ results, request: { q } }) => {
      return results?.map((data, index) => {
        return (
          <AddWordsItem
            key={`history-${index}`}
            className="Popup-cards-list-item"
            input={q}
            items={data}
            onAdd={handleAdd}
            speech
          />
        )
      })
    },
    [historyData],
  )

  return (
    <div {...props} className={clsx('AddWordsPanel', className)}>
      <div className="AddWordsPanel-header" {...getToggleProps()}>
        <div className="AddWordsPanel-header-content">
          <div className="AddWordsPanel-title">{title}</div>
          <div className="AddWordsPanel-description">{description}</div>
        </div>
        <div className="AddWordsPanel-arrow">
          <ArrowIcon />
        </div>
      </div>
      <div className="AddWordsPanel-content-wrapper" {...getCollapseProps()}>
        <div className="AddWordsPanel-content">
          <div className="AddWordsPanel-search">
            <Search
              onChange={onSearch}
              suggestions={[]}
              className="AddWordsPanel-search-input-wrapper"
              inputProps={{ className: 'AddWordsPanel-search-input' }}
              value={query}
            />

            <AddWordsFilters
              className="AddWordsPanel-search-filter"
              items={filters}
              onSelect={onChangeFilter}
            />
          </div>

          {!translationData?.results?.length && !historyData?.length && (
            <div className="AddWordsPanel-empty">
              Вбейте слово в поиск, чтобы увидеть его перевод
            </div>
          )}

          {isLoading && <Loader />}

          {!isLoading && (
            <div className="AddWordsPanel-items">
              {!!translationData?.results?.length && (
                <div className="AddWordsPanel-item">
                  <TranslationListTitle className="AddWordsPanel-result-title">
                    Результат поиска
                  </TranslationListTitle>

                  <div className="AddWordsPanel-list">
                    {translationData?.results?.map(renderTranslationCard)}
                  </div>
                </div>
              )}

              {!!historyData?.length && (
                <div className="AddWordsPanel-item">
                  <TranslationListTitle className="AddWordsPanel-result-title">
                    Недавно просмотренные
                  </TranslationListTitle>

                  <div className="AddWordsPanel-list">
                    <div className="AddWordsPanel-list">{historyData?.map(renderHistoryCard)}</div>{' '}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default React.memo(AddWordsPanel)
