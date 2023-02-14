import React from 'react'
import { render } from 'react-dom'
import Content from './Content'
import Provider from '../../containers/Provider/Provider'

const app = document.createElement('div')
app.id = 'echoExtension'

document.body.append(app)

const content = (
  <Provider>
    <Content />
  </Provider>
)

render(content, window.document.querySelector(`#${app.id}`))
