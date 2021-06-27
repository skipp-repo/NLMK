import React from 'react'

export type MyVocabularyProps = {

}

const MyVocabulary: React.FC<MyVocabularyProps> = ({ children }) => {
  return (
    <div>
      MyVocabulary
    </div>
  )
}

export default React.memo(MyVocabulary)
