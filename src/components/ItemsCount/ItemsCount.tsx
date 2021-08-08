import React from 'react'
import clsx from 'clsx'
import './ItemsCount.scss'

export type ItemsCountProps = Omit<JSX.IntrinsicElements['span'], 'children'> & {
  children: string
}

const ItemsCount: React.FC<ItemsCountProps> = ({ children, className, ...props }) => {
  return (
    <span {...props} className={clsx('ItemsCount', className)}>
      {children}
    </span>
  )
}

export default React.memo(ItemsCount)
