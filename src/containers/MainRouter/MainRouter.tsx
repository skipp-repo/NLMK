import React from 'react'
import { Route, Router } from 'wouter'
import Glossaries from '../Glossaries/Glossaries'
import Documents from '../Documents/Documents'
import EditDocument from '../EditDocument/EditDocument'
import MyVocabulary from '../MyVocabulary/MyVocabulary'
import useHashLocation from './useHashLocation'

export type MainRouterProps = {
  children: React.ReactElement | React.ReactElement[]
}

const MainRouter: React.FC<MainRouterProps> = ({ children }) => {
  return (
    <Router hook={useHashLocation}>
      {children}
      <Route path="/vocabulary" component={MyVocabulary} />
      <Route path="/glossaries" component={Glossaries} />
      <Route path="/documents" component={Documents} />
      <Route path="/documents/edit/:id" component={EditDocument} />
    </Router>
  )
}

export default React.memo(MainRouter)
