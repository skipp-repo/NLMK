import React from 'react'
import { render } from 'react-dom'

import Main from './Main'
import './index.css'

render(<Main />, window.document.querySelector('#app-container'))

if (module.hot) module.hot.accept()
