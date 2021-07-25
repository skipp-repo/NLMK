import React from 'react'
import clsx from 'clsx'
import Autosuggest from 'react-autosuggest'
import './PopupSearch.scss'
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg'

export type PopupSearchProps = {
  suggestions: string[]
  className?: string
  inputProps?: JSX.IntrinsicElements['input']
  onChange(value: string): void
}

const renderSuggestion = (suggestion) => suggestion

const PopupSearch: React.FC<PopupSearchProps> = ({
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
    <div className={clsx('PopupSearch', className)}>
      <Autosuggest
        suggestions={suggestions}
        inputProps={{
          // @ts-ignore
          value,
          placeholder: 'Перевести слово или фразу...',
          className: 'PopupSearch-input',
          onChange: handleChange,
          ...inputProps,
        }}
        renderSuggestion={renderSuggestion}
        getSuggestionValue={getSuggestionValue}
        onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={handleSuggestionsClearRequested}
        className="PopupSearch-suggestions"
        {...props}
      />
      <SearchIcon className="PopupSearch-icon" />
    </div>
  )
}

export default React.memo(PopupSearch)
