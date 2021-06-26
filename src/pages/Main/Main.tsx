import React from 'react'
import Provider from '../../containers/Provider/Provider'
import './Main.css'

const Main = () => {
  return (
    <Provider>
      <div className="App">Здесь будет список избранных слов, глоссарии, документы</div>
    </Provider>
  )
}

export default React.memo(Main)
