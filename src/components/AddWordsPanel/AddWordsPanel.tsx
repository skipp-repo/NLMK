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
  historyData?: any
  onAdd(word: string): void
  onSearch(newValue: string): void
  onChangeFilter({ type, selected, data }): void
}

const AddWordsPanel: React.FC<AddWordsPanelProps> = ({
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

  const renderTranslationCard = (data) => {
    return (
      <AddWordsItem
        key={data._id}
        className="AddWordsPanel-list-item"
        item={data}
        speech
        onAdd={handleAdd}
      />
    )
  }

  // const renderHistoryCard = React.useCallback(({ results, request: { q } }) => {
  //   return results?.map((data) => {
  //     return (
  //       <AddWordsPanel
  //         key={data?.translation?._id}
  //         className="AddWordsPanel-list-item"
  //         input={q}
  //         item={data}
  //         speech
  //         onAdd={handleAdd}
  //       />
  //     )
  //   })
  // }, [])

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
            />

            <AddWordsFilters
              className="AddWordsPanel-search-filter"
              items={filters}
              onSelect={onChangeFilter}
            />
          </div>

          {!translationData?.results?.length && (
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

              {/*{!!historyData?.length && (*/}
              {/*  <div className="AddWordsPanel-item">*/}
              {/*    <TranslationListTitle className="AddWordsPanel-title">Недавно просмотренные</TranslationListTitle>*/}

              {/*    <div className="AddWordsPanel-list">*/}
              {/*      <div className="AddWordsPanel-list">{historyData?.map(renderHistoryCard)}</div>{' '}*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*)}*/}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default React.memo(AddWordsPanel)
