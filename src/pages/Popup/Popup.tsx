import React from 'react'
import Provider from '../../containers/Provider/Provider'
import './Popup.css'

const Popup = () => {
  const handleOpenMain = () => window.open('main.html')

  return (
    <Provider>
      <div className="App">
        <p>Popup</p>
        <button className="App-link" onClick={handleOpenMain}>
          Открыть страницу со словарями
        </button>
      </div>
    </Provider>
  )
}

export default React.memo(Popup)
