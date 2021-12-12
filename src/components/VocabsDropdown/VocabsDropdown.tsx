import React from 'react'
import clsx from 'clsx'
import { useClickOutside } from 'use-events'
import './VocabsDropdown.scss'
import IconButton from '../IconButton/IconButton'
import { ReactComponent as ArrowIcon } from '../../assets/icons/arrow-2.svg'
import Checkbox from '../Checkbox/Checkbox'

export enum ItemType {
  checkbox = 'checkbox',
  action = 'action',
}

type Id = number | string

type Item = {
  id?: Id
  name: string
  checked?: boolean
  type?: ItemType
}

export type VocabsDropdownProps = Omit<JSX.IntrinsicElements['div'], 'onSelect' | 'disabled'> & {
  text: string
  items?: Item[]
  onSelect?(id: Id, checked?: boolean): void
  disabled: boolean
}

const VocabsDropdown: React.FC<VocabsDropdownProps> = ({
  children,
  className,
  text,
  items,
  disabled,
  onSelect,
  ...props
}) => {
  const [opened, setOpened] = React.useState(false)
  const ref = React.useRef()

  const handleClick = () => {
    setOpened(!opened)
  }

  const handleSelect =
    (id) =>
    ({ target: { checked } }) => {
      onSelect(id, checked)
    }

  const handleActionClick = (id) => () => onSelect(id)

  const renderItem = ({ id, name, checked, type = ItemType.checkbox }: Item) => {
    switch (type) {
      case ItemType.checkbox: {
        return (
          <Checkbox
            key={id}
            className="VocabsDropdown-item"
            text={name}
            onChange={handleSelect(id)}
            checked={checked}
          />
        )
      }
      case ItemType.action: {
        return (
          <div className="VocabsDropdown-item-action" key={id} onClick={handleActionClick(id)}>
            {name}
          </div>
        )
      }
    }
    return
  }

  useClickOutside([ref], () => setOpened(false))

  return (
    <div
      {...props}
      className={clsx('VocabsDropdown', className, {
        VocabsDropdown_opened: opened,
      })}
      ref={ref}
    >
      <IconButton text={text} Icon={ArrowIcon} onClick={handleClick} disabled={disabled} />

      {opened && (
        <div className="VocabsDropdown-dropdown">
          {items && <div className="VocabsDropdown-items">{items.map(renderItem)}</div>}
        </div>
      )}
    </div>
  )
}

export default React.memo(VocabsDropdown)
