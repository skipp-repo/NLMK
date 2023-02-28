import { QueryClient } from '@tanstack/react-query'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import storage from './storage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
      staleTime: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  },
})

export default queryClient

export const persister = createAsyncStoragePersister({
  storage: storage,
})
