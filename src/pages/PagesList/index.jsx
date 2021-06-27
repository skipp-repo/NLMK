import React from 'react'
import { render } from 'react-dom'
import PagesList from './PagesList'
import './index.css'

render(<PagesList />, window.document.querySelector('#app-container'))

if (module.hot) module.hot.accept()
