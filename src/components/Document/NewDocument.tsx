import React from 'react'
import clsx from 'clsx'
import './Document.scss'
import { ReactComponent as FileIcon } from '../../assets/icons/new-file.svg'

export type NewDocumentProps = JSX.IntrinsicElements['div'] & {
  onClick(): void
}

const NewDocument: React.FC<NewDocumentProps> = ({ onClick, className, ...props }) => {
  return (
    <div {...props} className={clsx('Document', className)} onClick={onClick}>
      <div className="Document-name">Создать документ</div>
      <div className="Document-container Document-container_new">
        <FileIcon />
        <div className="Document-new-text">Новый документ</div>
      </div>
    </div>
  )
}

export default React.memo(NewDocument)
