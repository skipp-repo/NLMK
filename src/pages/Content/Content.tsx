import React from 'react'
import ReactTooltip from 'react-tooltip'
import Provider from '../../containers/Provider/Provider'

const Content = () => {
  const handleSelectionChange = (): void => {
    const selection: any = document.getSelection()
    // selection.baseNode.setAttribute('data-tip', 'test')
    ReactTooltip.rebuild()
    ReactTooltip.show(selection.baseNode)
  }

  React.useEffect(() => {
    const listener: any = document.addEventListener('selectionchange', handleSelectionChange)

    return () => document.removeEventListener('selectionchange', listener)
  }, [])

  return (
    <Provider>
      <p data-tip="hello world">Tooltip</p>

      <div className="App">Content</div>

      <ReactTooltip />
    </Provider>
  )
}

export default React.memo(Content)
