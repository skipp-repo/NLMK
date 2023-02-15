import React from 'react'
import { render } from 'react-dom'

import Main from './Main'
import './index.css'
import BaseContainer from '../../containers/BaseContainer/BaseContainer'

const index = (
  <BaseContainer>
    <Main />
  </BaseContainer>
)

render(index, window.document.querySelector('#app-container'))

if (module.hot) module.hot.accept()
