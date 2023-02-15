import React from 'react'
import { render } from 'react-dom'
import Popup from './Popup'
import './index.scss'
import 'normalize.css'
import BaseContainer from '../../containers/BaseContainer/BaseContainer'

const index = (
  <BaseContainer>
    <Popup />
  </BaseContainer>
)

render(index, window.document.querySelector('#app-container'))

if (module.hot) module.hot.accept()
