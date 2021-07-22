import React from 'react'
import clsx from 'clsx'
import Autosuggest from 'react-autosuggest'
import './PopupSearch.scss'
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg'

export type PopupSearchProps = JSX.IntrinsicElements['input'] & {
  suggestions: string[]
}

const renderSuggestion = (suggestion) => suggestion

const PopupSearch: React.FC<PopupSearchProps> = ({
  children,
  className,
  onChange,
  suggestions,
  ...props
}) => {
  const [value, setValue] = React.useState('')

  const handleChange = (event) => {
    const {
      target: { value },
    } = event
    setValue(value)
    onChange(event)
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
          ...props,
        }}
        renderSuggestion={renderSuggestion}
        className="PopupSearch-suggestions"
      />
      <SearchIcon className="PopupSearch-icon" />
    </div>
  )
}

export default React.memo(PopupSearch)
