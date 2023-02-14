import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '../../redux/store'
import queryClient, { persister } from '../../queryClient'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'

export type ProviderProps = {
  children: React.ReactElement | React.ReactElement[]
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
          {children}
        </PersistQueryClientProvider>
      </PersistGate>
    </ReduxProvider>
  )
}

export default React.memo(Provider)
