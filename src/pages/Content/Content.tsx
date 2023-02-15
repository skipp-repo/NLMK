import React, { useMemo } from 'react'
import useReduxAction from '../../hooks/useReduxAction'
import * as vocabsSlice from '../../redux/slices/vocabs'
import './content.styles.css'
import VirtualElement from '../../utils/VirtualElement'
import checkNodeContainsInNode from '../../utils/checkNodeContainsInNode'
import Tooltip from '../../components/Tooltip/Tooltip'
import { useQuery } from '@tanstack/react-query'
import createTranslationString from '../../utils/createTranslationString'
import flatten from 'arr-flatten'
import { translation } from '../../api/requests/translation'
import { EditVocabFolder } from '../../api/requests/editVocabFolder'
import useStatus from '../../hooks/useStatus'
const Content = () => {
  useStatus()

  const reduxAction = useReduxAction()

  const [selectedText, setSelectedText] = React.useState<string>()

  const addToBookmarks = reduxAction(({ cardsToAdd }: Omit<EditVocabFolder, 'id'>) =>
    vocabsSlice.editFolder({ id: 'default', cardsToAdd }),
  )

  const fetcher = async (text) => {
    return await translation({ q: text })
  }

  const { data, error, isFetching } = useQuery(['translation', selectedText], () =>
    fetcher(selectedText),
  )

  const translationString = useMemo(
    () => (data?.data?.results ? createTranslationString(flatten(data.data.results)) : ''),
    [data?.data?.results],
  )

  const handleAddToBookmarks = (id: number) => {
    addToBookmarks({ cardsToAdd: [id] })
  }

  const [referenceElement, setReferenceElement] = React.useState<VirtualElement | null>(null)

  const className = 'echoTooltip'

  const checkNodeInTooltip = React.useCallback(
    (node) => checkNodeContainsInNode(node, className),
    [className],
  )
  const virtualElement = React.useMemo(
    () => new VirtualElement(checkNodeInTooltip),
    [checkNodeInTooltip],
  )
  const popperRef = React.useRef<{ update: Function } | null>(null)

  React.useEffect(() => {
    virtualElement.rectChangedCallback = (rect, text) => {
      setSelectedText(text)

      if (!rect) {
        setReferenceElement(null)
      } else {
        setReferenceElement(virtualElement)
      }

      if (popperRef.current?.update) {
        popperRef.current?.update()
      }
    }

    return () => {
      virtualElement.destroy()
    }
  }, [])

  if (referenceElement === null || !translationString) {
    return null
  }

  return (
    <Tooltip
      className={className}
      referenceElement={referenceElement}
      // @ts-ignore
      ref={popperRef}
      bookmarked={false} // TODO
      loading={isFetching}
      // @ts-ignore // TODO
      error={error}
      onAddToBookmarks={handleAddToBookmarks}
    >
      {translationString}
    </Tooltip>
  )
}

export default React.memo(Content)
