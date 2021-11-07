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
  const titleValueRef = React.useRef(title)

  const handleClickEdit = () => {
    const nextEditing = !editing

    setEditing(nextEditing)

    console.log(titleValueRef.current)

    if (!nextEditing && titleValueRef.current.length) {
      onChange(titleValueRef.current)
    }
  }

  const handleChange = ({ target }) => {
    titleValueRef.current = target.value
  }

  const IconComponent = editing ? TickIcon : PencilIcon

  return (
    <div {...props} className={clsx('EditableTitle', className)}>
      {editing ? (
        <input
          className="EditableTitle-input"
          onChange={handleChange}
          defaultValue={title}
          readOnly={!editing}
        />
      ) : (
        <div className="EditableTitle-title">{title}</div>
      )}
      <IconComponent className="EditableTitle-icon" onClick={handleClickEdit} />
    </div>
  )
}

export default React.memo(EditableTitle)
