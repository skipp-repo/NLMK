import React from 'react'
import { render } from 'react-dom'

import Main from './Main'
import './index.css'
import Provider from '../../containers/Provider/Provider'

const index = (
  <Provider>
    <Main />
  </Provider>
)

render(index, window.document.querySelector('#app-container'))

if (module.hot) module.hot.accept()
