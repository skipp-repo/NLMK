import React from 'react'

export type MyDocumentsProps = {

}

const MyDocuments: React.FC<MyDocumentsProps> = ({ children }) => {
  return (
    <div>
      MyDocuments
    </div>
  )
}

export default React.memo(MyDocuments)
