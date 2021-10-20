import React from 'react'
import clsx from 'clsx'
import './Document.scss'
import { ReactComponent as DownloadIcon } from '../../assets/icons/download.svg'
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg'
import Checkbox from '../Checkbox/Checkbox'

export type DocumentProps = Omit<JSX.IntrinsicElements['div'], 'id' | 'onSelect'> & {
  name: string
  children: string
  checked: boolean
  id: number
  onSelect(id: number, selected: boolean): void
  onClick(id: number): void
}

const Document: React.FC<DocumentProps> = ({
  name,
  children,
  checked,
  id,
  onSelect,
  onClick,
  className,
  ...props
}) => {
  const handleSelect = ({ target }) => {
    onSelect(id, target.checked)
  }

  const handleClick = () => {
    onClick(id)
  }

  return (
    <div {...props} className={clsx('Document', className)} onClick={handleClick}>
      <div className="Document-name">{name}</div>
      <div className="Document-container">
        <Checkbox checked={checked} className="Document-checkbox" onChange={handleSelect} />
        <div className="Document-content">{children}</div>
        <div className="Document-actions">
          <div className="Document-download">
            <DownloadIcon />
          </div>
          <div className="Document-delete">
            <DeleteIcon />
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Document)
