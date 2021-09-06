import React from 'react'
import clsx from 'clsx'
import Autosuggest from 'react-autosuggest'
import './Search.scss'
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg'

export type SearchProps = {
  suggestions: string[]
  className?: string
  inputProps?: JSX.IntrinsicElements['input']
  onChange(value: string): void
}

const renderSuggestion = (suggestion) => suggestion

const Search: React.FC<SearchProps> = ({
  children,
  className,
  suggestions,
  inputProps,
  onChange,
  ...props
}) => {
  const [value, setValue] = React.useState('')

  const handleChange = (event, { newValue }) => {
    setValue(newValue)

    onChange && onChange(newValue)
  }

  const handleSuggestionsFetchRequested = ({ value }) => {}

  const handleSuggestionsClearRequested = () => {}

  function getSuggestionValue(suggestion) {
    setValue(suggestion)

    return suggestion
  }

  return (
    <div className={clsx('Search', className)}>
      <Autosuggest
        suggestions={suggestions}
        inputProps={{
          // @ts-ignore
          value,
          placeholder: 'Найти слово или фразу...',
          className: 'Search-input',
          onChange: handleChange,
          ...inputProps,
        }}
        renderSuggestion={renderSuggestion}
        getSuggestionValue={getSuggestionValue}
        onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={handleSuggestionsClearRequested}
        className="Search-suggestions"
        {...props}
      />
      <SearchIcon className="Search-icon" />
    </div>
  )
}

export default React.memo(Search)
