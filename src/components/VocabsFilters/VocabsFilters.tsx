import React from 'react'
import clsx from 'clsx'
import { useClickOutside } from 'use-events'
import './VocabsFilters.scss'
import { ReactComponent as ArrowIcon } from '../../assets/icons/arrow-2.svg'
import { Filters } from '../../types/filters'
import Checkbox from '../Checkbox/Checkbox'

export type VocabsFiltersProps = Omit<JSX.IntrinsicElements['div'], 'onSelect'> & {
  text?: string
  items?: Filters
  onSelect?({ type, selected, data: any }): void
}

const VocabsFilters: React.FC<VocabsFiltersProps> = ({
  children,
  className,
  text = 'Фильтр',
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
      className="VocabsFilters-item"
      text={name}
      checked={selected}
      onChange={handleSelect({ type, data })}
    />
  )

  const renderItem = ({ name, items }) => (
    <React.Fragment key={name}>
      <span className="VocabsFilters-name">{name}</span>
      {items.map(renderCheckbox)}
    </React.Fragment>
  )

  useClickOutside([ref], () => setOpened(false))

  return (
    <div
      {...props}
      className={clsx('VocabsFilters', className, {
        VocabsFilters_opened: opened,
      })}
      ref={ref}
    >
      <div className="VocabsFilters-button" onClick={handleClick}>
        <span className="VocabsFilters-button-text">{text}</span>

        <ArrowIcon className="VocabsFilters-button-icon" />
      </div>

      {opened && !!items?.length && (
        <div className="VocabsFilters-dropdown">
          <div className="VocabsFilters-items">{items.map(renderItem)}</div>
        </div>
      )}
    </div>
  )
}

export default React.memo(VocabsFilters)
