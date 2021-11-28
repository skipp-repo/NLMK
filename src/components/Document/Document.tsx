import React from 'react'
import clsx from 'clsx'
import './Document.scss'
import { ReactComponent as DownloadIcon } from '../../assets/icons/download.svg'
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg'
import Checkbox from '../Checkbox/Checkbox'
import DOMPurify from 'dompurify'

export type DocumentProps = Omit<JSX.IntrinsicElements['div'], 'id' | 'onSelect'> & {
  name: string
  data: string
  checked: boolean
  id: number
  onSelect(id: number, selected: boolean): void
  onClick(id: number): void
  onDownload(id: number): void
  onDelete(id: number): void
}

const Document: React.FC<DocumentProps> = ({
  name,
  data,
  checked,
  id,
  onSelect,
  onClick,
  onDownload,
  onDelete,
  className,
  ...props
}) => {
  const handleSelect = ({ target }) => {
    onSelect(id, target.checked)
  }

  const handleClick = () => {
    onClick(id)
  }

  const handleDownload = () => {
    onDownload(id)
  }

  const handleDelete = () => {
    onDelete(id)
  }

  const safeData = React.useMemo(() => {
    const clean = DOMPurify.sanitize(data, { ALLOWED_TAGS: [] })

    return clean.slice(0, 135)
  }, [data])

  return (
    <div {...props} className={clsx('Document', className)}>
      <div className="Document-name">{name}</div>
      <div className="Document-container">
        <Checkbox checked={checked} className="Document-checkbox" onChange={handleSelect} />
        <div
          className="Document-content"
          onClick={handleClick}
          dangerouslySetInnerHTML={{ __html: safeData }}
        />
        <div className="Document-actions">
          <div className="Document-download" onClick={handleDownload}>
            <DownloadIcon />
          </div>
          <div className="Document-delete" onClick={handleDelete}>
            <DeleteIcon />
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Document)
