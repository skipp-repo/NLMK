import React from 'react'
import clsx from 'clsx'
import './Tabs.scss'
import Tab from './Tab'

export type TabType = {
  name: string
  id: number
}

export type TabsProps = JSX.IntrinsicElements['nav'] & {
  tabs: TabType[]
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

  const handleTabChange = (id) => {
    onChange(id)

    setActiveTab(id)
  }

  const handleTabRename = (id, newName) => {
    onRename(id, newName)
  }

  const handleTabDelete = (id) => {
    onDelete(id)
  }

  const renderTab = ({ name, id }, index) => (
    <Tab
      name={name}
      id={id}
      active={activeTab === id}
      editable={index === 0}
      onClick={handleTabChange}
      onRename={handleTabRename}
      onDelete={handleTabDelete}
    />
  )

  React.useEffect(() => {
    if (!activeTab && tabs?.length) {
      setActiveTab(tabs[0].id)
    }
  }, [tabs])

  console.log('change', activeTab)

  return (
    <nav {...props} className={clsx('Tabs', className)}>
      {tabs?.map(renderTab)}
    </nav>
  )
}

export default React.memo(Tabs)
