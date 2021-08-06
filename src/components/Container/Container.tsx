import React from 'react'
import clsx from 'clsx'
import './Container.css'

export type ContainerProps = JSX.IntrinsicElements['div'] & {}

const Container: React.FC<ContainerProps> = ({ children, className, ...props }) => {
  return (
    <div {...props} className={clsx('Container', className)}>
      {children}
    </div>
  )
}

export default React.memo(Container)
