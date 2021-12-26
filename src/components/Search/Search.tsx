import React from 'react'
import clsx from 'clsx'
import Autosuggest from 'react-autosuggest'
import './Search.scss'
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg'

export type SearchProps = {
  suggestions: string[]
  className?: string
  inputProps?: JSX.IntrinsicElements['input']
  value: string
  onChange(value: string): void
}

const renderSuggestion = (suggestion) => suggestion

function getSuggestionValue(suggestion) {
  return suggestion
}

const Search: React.FC<SearchProps> = ({
  children,
  className,
  suggestions,
  inputProps,
  value,
  onChange,
  ...props
}) => {
  const handleChange = (event, { newValue }) => {
    onChange && onChange(newValue)
  }

  const handleSuggestionsFetchRequested = ({ value }) => {}

  const handleSuggestionsClearRequested = () => {}

  return (
    <div className={clsx('Search', className)}>
      <Autosuggest
        suggestions={suggestions}
        renderSuggestion={renderSuggestion}
        getSuggestionValue={getSuggestionValue}
        onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={handleSuggestionsClearRequested}
        className="Search-suggestions"
        {...props}
        inputProps={{
          // @ts-ignore
          value,
          placeholder: 'Найти слово или фразу...',
          onChange: handleChange,
          ...inputProps,
          className: clsx('Search-input', inputProps?.className),
        }}
      />
      <SearchIcon className="Search-icon" />
    </div>
  )
}

export default React.memo(Search)
