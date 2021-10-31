import React from 'react'
import clsx from 'clsx'

export type EditorControlProps = JSX.IntrinsicElements['div'] & {
  onToggle: (style: string) => void
  active: boolean
  label: string
  style: string
  Icon: React.FunctionComponent
}

const EditorControl: React.FC<EditorControlProps> = ({
  onToggle,
  active,
  label,
  style,
  Icon,
  ...props
}) => {
  const handleMouseDown = (e) => {
    e.preventDefault()
    onToggle(style)
  }

  return (
    <span
      className={clsx('EditorControl', {
        EditorControl_active: active,
      })}
      onMouseDown={handleMouseDown}
    >
      {Icon && <Icon />}
    </span>
  )
}

export default React.memo(EditorControl)
