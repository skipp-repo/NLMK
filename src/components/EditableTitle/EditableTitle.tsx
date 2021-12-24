import React from 'react'
import clsx from 'clsx'
import './EditableTitle.scss'
import { ReactComponent as PencilIcon } from '../../assets/icons/pencil.svg'
import { ReactComponent as TickIcon } from '../../assets/icons/checkbox-tick.svg'

export type EditableTitleProps = JSX.IntrinsicElements['div'] & {
  title: string
  onChange(newTitle: string)
}

const EditableTitle: React.FC<EditableTitleProps> = ({
  title,
  children,
  onChange,
  className,
  ...props
}) => {
  const [editing, setEditing] = React.useState(false)
  const [value, setValue] = React.useState(title)
  const inputRef = React.useRef<HTMLInputElement>()

  const handleClickEdit = () => {
    const nextEditing = !editing

    setEditing(nextEditing)

    if (!nextEditing && value.length) {
      onChange(value)
    }
  }

  const handleChange = ({ target }) => {
    setValue(target.value)
  }

  const handleBlur = () => {
    handleClickEdit()
  }

  const IconComponent = editing ? TickIcon : PencilIcon

  React.useEffect(() => {
    setValue(title)
  }, [title])

  React.useEffect(() => {
    if (!editing) return

    inputRef.current?.focus()
  }, [editing])

  return (
    <div {...props} className={clsx('EditableTitle', className)}>
      {editing ? (
        <input
          className="EditableTitle-input"
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
          readOnly={!editing}
          ref={inputRef}
        />
      ) : (
        <div className="EditableTitle-title">{value}</div>
      )}
      <IconComponent className="EditableTitle-icon" onClick={handleClickEdit} />
    </div>
  )
}

export default React.memo(EditableTitle)
