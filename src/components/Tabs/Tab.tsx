import React from 'react'
import clsx from 'clsx'
import { ReactComponent as PencilIcon } from '../../assets/icons/pencil.svg'
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg'

export type TabProps = Omit<JSX.IntrinsicElements['div'], 'id'> & {
  name: string
  id: number
  active: boolean
  editable: boolean
  onClick(id: number): void
  onRename({ id: number, name: string }): void
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

  const handleRename = () => {
    onRename({ id, name })
  }

  const handleDelete = () => {
    onDelete(id)
  }

  return (
    <div
      className={clsx('Tabs-item', active && 'Tabs-item_active', editable && 'Tabs-item_editable')}
      key={id}
      // @ts-ignore
      onClick={handleTabChange}
    >
      <span className="Tabs-text">{name}</span>

      {editable && (
        <div className={clsx('Tabs-actions', active && 'Tabs-actions_active')}>
          <button className="Tabs-action" onClick={handleRename}>
            <PencilIcon className="Tabs-icon" />
          </button>
          <button className="Tabs-action" onClick={handleDelete}>
            <DeleteIcon className="Tabs-icon" />
          </button>
        </div>
      )}
    </div>
  )
}

export default React.memo(Tab)
