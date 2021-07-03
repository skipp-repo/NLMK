import React from 'react'
import Provider from '../../containers/Provider/Provider'
import './Popup.css'
import PopupHeader from '../../containers/PopupHeader/PopupHeader'
import PopupSearch from '../../components/PopupSearch/PopupSearch'

const Popup = () => {
  const handleOpenMain = () => window.open('main.html')

  return (
    <Provider>
      <PopupHeader className="Popup-header" />

      <div className="Popup-container">
        <PopupSearch className="Popup-search" />
      </div>
    </Provider>
  )
}

export default React.memo(Popup)
