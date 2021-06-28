import React from 'react'
import { render } from 'react-dom'
import Content from './Content'

const app = document.createElement('div')
app.id = 'nlmk'

document.body.append(app)

render(<Content />, window.document.querySelector(`#${app.id}`))
