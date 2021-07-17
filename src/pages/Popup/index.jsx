import React from 'react'
import { render } from 'react-dom'
import Popup from './Popup'
import './index.scss'
import 'normalize.css'
import Provider from '../../containers/Provider/Provider'

const index = (
  <Provider>
    <Popup />
  </Provider>
)

render(index, window.document.querySelector('#app-container'))

if (module.hot) module.hot.accept()
