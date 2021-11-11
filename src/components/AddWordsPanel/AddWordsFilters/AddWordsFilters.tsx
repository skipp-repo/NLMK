import React from 'react'
import clsx from 'clsx'
import { useClickOutside } from 'use-events'
import './AddWordsFilters.scss'
import { Filters } from '../../../types/filters'
import { ReactComponent as FiltersIcon } from '../../../assets/icons/filters.svg'
import Checkbox from '../../Checkbox/Checkbox'

export type AddWordsFiltersProps = Omit<JSX.IntrinsicElements['div'], 'onSelect'> & {
  items?: Filters
  onSelect?({ type, selected, data: any }): void
}

const AddWordsFilters: React.FC<AddWordsFiltersProps> = ({
  children,
  className,
  items,
  onSelect,
  ...props
}) => {
  const [opened, setOpened] = React.useState(false)
  const ref = React.useRef()

  const handleClick = () => {
    setOpened(!opened)
  }

  const handleSelect =
    ({ type, data }) =>
    ({ target }) => {
      onSelect({ type, selected: target.checked, data })
    }

  const renderCheckbox = ({ key, type, name, data, selected }) => (
    <Checkbox
      key={key}
      className="AddWordsFilters-item"
      text={name}
      checked={selected}
      onChange={handleSelect({ type, data })}
    />
  )

  const renderItem = ({ name, items }) => (
    <>
      <span key={name} className="AddWordsFilters-name">
        {name}
      </span>
      {items.map(renderCheckbox)}
    </>
  )

  useClickOutside([ref], () => setOpened(false))

  return (
    <div
      {...props}
      className={clsx('AddWordsFilters', className, {
        AddWordsFilters_opened: opened,
      })}
      ref={ref}
    >
      <div className="AddWordsFilters-button" onClick={handleClick}>
        <FiltersIcon className="AddWordsFilters-button-icon" />
      </div>

      {opened && !!items?.length && (
        <div className="AddWordsFilters-dropdown">
          <div className="AddWordsFilters-items">{items.map(renderItem)}</div>
        </div>
      )}
    </div>
  )
}

export default React.memo(AddWordsFilters)
