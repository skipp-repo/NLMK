import React from 'react'
import clsx from 'clsx'
import './Tabs.scss'
import { CarouselProvider } from 'pure-react-carousel'
import TabsContent from './TabsContent'
import 'pure-react-carousel/dist/react-carousel.es.css'

export type TabType = {
  name: string
  id: number
}

export type TabsProps = JSX.IntrinsicElements['nav'] & {
  tabs: TabType[]
  onChange(id: number): void
  onRename(id: number): void
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
  return (
    <nav {...props} className={clsx('Tabs', className)}>
      {!!tabs?.length && (
        <CarouselProvider
          naturalSlideWidth={1000}
          totalSlides={tabs.length}
          naturalSlideHeight={300}
          visibleSlides={4}
          isIntrinsicHeight={true}
          className="Tabs-carousel"
          dragEnabled={false}
          step={4}
        >
          <TabsContent tabs={tabs} onChange={onChange} onDelete={onDelete} onRename={onRename} />
        </CarouselProvider>
      )}
    </nav>
  )
}

export default React.memo(Tabs)
