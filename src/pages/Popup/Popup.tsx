import React from 'react'
import Provider from '../../containers/Provider/Provider'
import './Popup.css'
import PopupHeader from '../../containers/PopupHeader/PopupHeader'

const Popup = () => {
  const handleOpenMain = () => window.open('main.html')

  return (
    <Provider>
      <PopupHeader />

      <div className="App">
        <button className="App-link" onClick={handleOpenMain}>
          Открыть страницу со словарями
        </button>
      </div>
    </Provider>
  )
}

export default React.memo(Popup)
