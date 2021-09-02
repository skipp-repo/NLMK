import React from 'react'
import clsx from 'clsx'
import { useClickOutside } from 'use-events'
import './VocabsDropdown.scss'
import IconButton from '../IconButton/IconButton'
import { ReactComponent as ArrowIcon } from '../../assets/icons/arrow-2.svg'
import Checkbox from '../Checkbox/Checkbox'

type Item = {
  id: number
  name: string
}
export type VocabsDropdownProps = JSX.IntrinsicElements['div'] & {
  text: string
  items?: Item[]
  onSelect?(id: number): void
}

const VocabsDropdown: React.FC<VocabsDropdownProps> = ({
  children,
  className,
  text,
  items,
  onSelect,
  ...props
}) => {
  const [opened, setOpened] = React.useState(false)
  const ref = React.useRef()

  const handleClick = () => {
    setOpened(!opened)
  }

  const handleSelect = (id) => () => {
    onSelect(id)
  }

  const renderItem = ({ id, name }) => (
    <div key={id} onClick={handleSelect(id)} className="VocabsDropdown-item">
      <Checkbox text={name} />
    </div>
  )

  useClickOutside([ref], () => setOpened(false))

  return (
    <div
      {...props}
      className={clsx('VocabsDropdown', className, {
        VocabsDropdown_opened: opened,
      })}
      ref={ref}
    >
      <IconButton text={text} Icon={ArrowIcon} onClick={handleClick} />

      {opened && (
        <div className="VocabsDropdown-dropdown">
          {items && <div className="VocabsDropdown-items">{items.map(renderItem)}</div>}
        </div>
      )}
    </div>
  )
}

export default React.memo(VocabsDropdown)
