import { ContentState, convertToRaw } from 'draft-js'
import React from 'react'
import './EditDocument.scss'
import { useSelector } from 'react-redux'
import Container from '../../components/Container/Container'
import useReduxAction from '../../hooks/useReduxAction'
import BackLink from '../../components/BackLink/BackLink'
import Editor from '../../components/Editor/Editor'
import * as documentsSlice from '../../redux/slices/documents'
import contentStateToHtml from '../../utils/contentStateToHtml'

export type MyEditDocumentProps = {
  params: { id: string }
}

const EditDocument: React.FC<MyEditDocumentProps> = ({ params: { id } }) => {
  const reduxAction = useReduxAction()

  const currentDocument = useSelector(documentsSlice.selectors.documentById(id))

  const uploadDocument = reduxAction(documentsSlice.uploadDocument)
  const getDocument = reduxAction(documentsSlice.getDocument)

  const handleChange = async (content: ContentState) => {
    if (content.hasText()) {
      const file = await contentStateToHtml(content)

      // const formData = new FormData()
      // // @ts-ignore
      // formData.append('userDoc', file, file?.name || 'unnamed')
      //
      // if (id === 'new') {
      //   uploadDocument(formData)
      // }
    }
  }

  React.useEffect(() => {
    if (id === 'new') return

    getDocument({ id })
  }, [id])

  return (
    <div className="EditDocument">
      <Container>
        <BackLink href="/documents/">Вернуться назад</BackLink>

        <Editor
          className="EditDocument-editor"
          onChange={handleChange}
          html={currentDocument?.data}
        />
      </Container>
    </div>
  )
}

export default React.memo(EditDocument)
