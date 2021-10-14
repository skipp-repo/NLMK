import { ButtonBack, ButtonNext, Slide, Slider } from 'pure-react-carousel'
import React from 'react'
import { ReactComponent as SliderArrow } from '../../assets/icons/slider-arrow.svg'
import Tab from './Tab'
import { TabType } from './Tabs'

export type TabsContentProps = {
  tabs: TabType[]
  editable?: boolean
  onChange(id: number): void
  onRename({ id: number, name: string }): void
  onDelete(id): void
}

const TabsContent: React.FC<TabsContentProps> = ({
  tabs,
  editable,
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

  const handleTabRename = (id) => {
    onRename(id)
  }

  const handleTabDelete = (id) => {
    onDelete(id)
  }

  const renderTab = ({ name, id }, index) => (
    <Slide index={index} key={id} style={{ width: 'auto' }}>
      <Tab
        name={name}
        id={id}
        active={activeTab === id}
        editable={editable && index !== 0}
        onClick={handleTabChange}
        onRename={handleTabRename}
        onDelete={handleTabDelete}
      />
    </Slide>
  )

  React.useEffect(() => {
    if (!activeTab && tabs?.length) {
      setActiveTab(tabs[0].id)
    }
  }, [tabs])

  return (
    <>
      <Slider>{tabs?.map(renderTab)}</Slider>

      <div className="Tabs-arrows">
        <ButtonBack className="Tabs-back">
          <SliderArrow className="Tabs-back-arrow" />
        </ButtonBack>
        <ButtonNext className="Tabs-next">
          <SliderArrow className="Tabs-next-arrow" />
        </ButtonNext>
      </div>
    </>
  )
}

export default React.memo(TabsContent)
