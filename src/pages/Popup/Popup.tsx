import React from 'react'
import Provider from '../../containers/Provider/Provider'
import './Popup.css'

const Popup = () => {
  return (
    <Provider>
      <div className="App">Popup</div>
    </Provider>
  )
}

export default React.memo(Popup)
