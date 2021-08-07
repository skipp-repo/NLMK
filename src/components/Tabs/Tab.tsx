import React from 'react'
import clsx from 'clsx'

export type TabProps = Omit<JSX.IntrinsicElements['div'], 'id'> & {
  name: string
  id: number
  active: boolean
  editable: boolean
  onClick(id: number): void
  onRename(id: number, newName: string): void
  onDelete(id): void
}

const Tab: React.FC<TabProps> = ({
  name,
  id,
  active,
  editable,
  className,
  onClick,
  onRename,
  onDelete,
  ...props
}) => {
  const handleTabChange = () => {
    onClick(id)
  }

  return (
    <div
      className={clsx('Tabs-item', active && 'Tabs-item_active')}
      key={id}
      // @ts-ignore
      onClick={handleTabChange}
    >
      <span className="Tab-text">{name}</span>
    </div>
  )
}

export default React.memo(Tab)
