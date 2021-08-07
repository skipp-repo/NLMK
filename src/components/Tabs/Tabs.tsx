import React from 'react'
import clsx from 'clsx'
import './Tabs.scss'

export type Tab = {
  name: string
  id: number
}

export type TabsProps = JSX.IntrinsicElements['nav'] & {
  tabs: Tab[]
  onChange(id: number): void
  onRename(id: number, newName: string): void
  onDelete(id): void
}

const Tabs: React.FC<TabsProps> = ({
  children,
  className,
  tabs,
  onChange,
  onRename,
  onDelete,
  ...props
}) => {
  const [activeTab, setActiveTab] = React.useState<number | undefined>()

  const handleTabChange = (id) => () => {
    onChange(id)

    setActiveTab(id)
  }

  const renderTab = ({ name, id }) => (
    <button
      className={clsx('Tabs-item', activeTab === id && 'Tabs-item_active')}
      key={id}
      onClick={handleTabChange(id)}
    >
      <span className="Tabs-text">{name}</span>
    </button>
  )

  React.useEffect(() => {
    if (!activeTab && tabs?.length) {
      setActiveTab(tabs[0].id)
    }
  }, [tabs])

  return (
    <nav {...props} className={clsx('Tabs', className)}>
      {tabs?.map(renderTab)}
    </nav>
  )
}

export default React.memo(Tabs)
