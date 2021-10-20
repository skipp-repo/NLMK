import React from 'react'
import clsx from 'clsx'
import './Document.scss'
import { ReactComponent as DownloadIcon } from '../../assets/icons/download.svg'
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg'
import Checkbox from '../Checkbox/Checkbox'

export type DocumentProps = JSX.IntrinsicElements['div'] & {
  name: string
  children: string
  checked: boolean
}

const Document: React.FC<DocumentProps> = ({ name, children, checked, className, ...props }) => {
  return (
    <div {...props} className={clsx('Document', className)}>
      <div className="Document-name">{name}</div>
      <div className="Document-container">
        {checked && <Checkbox checked className="Document-checkbox" />}
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
