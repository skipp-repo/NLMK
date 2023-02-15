import React from 'react'
import { render } from 'react-dom'
import Content from './Content'
import BaseContainer from '../../containers/BaseContainer/BaseContainer'

const app = document.createElement('div')
app.id = 'echoExtension'

document.body.append(app)

const content = (
  <BaseContainer>
    <Content />
  </BaseContainer>
)

render(content, window.document.querySelector(`#${app.id}`))
