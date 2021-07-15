import generateStateVariables from './generateStateVariables'

export type SecondArg = {
  meta: any
  payload: PayloadPart
  error: Error
}

export type PayloadPart = {
  status: number
  error: string
  [key: string]: any
}

export type ExtraReducers = {
  pending?(state: any, secondArg: SecondArg): void
  fulfilled?(state: any, secondArg: SecondArg): void
  rejected?(state: any, secondArg: SecondArg): void
}

export type MakeReducers = {
  actions: {
    pending: any
    fulfilled: any
    rejected: any
  }
  actionName: string
  extraReducers?: ExtraReducers
  ignoreError?: boolean | undefined
  apiRequest?: boolean
}

export default ({
  actions,
  actionName,
  extraReducers,
  ignoreError = false,
  apiRequest = true,
}: MakeReducers) => {
  const { pending, fulfilled, rejected } = extraReducers || {}
  const names = generateStateVariables(actionName)

  return {
    [actions.pending.type]: (state: any, secondArg: SecondArg): void => {
      state.flags[names.error] = undefined
      state.flags[names.loading] = true

      if (pending) pending(state, secondArg)
    },
    [actions.fulfilled.type]: (state: any, secondArg: SecondArg): void => {
      const { payload } = secondArg
      const { status, error } = payload || {}

      state.flags[names.loading] = false

      if (apiRequest && status !== 200 && !ignoreError) {
        state.flags[names.error] = error || `Server Code ${status}`

        return
      }

      if (fulfilled) fulfilled(state, secondArg)
    },
    [actions.rejected.type]: (state: any, secondArg: SecondArg): void => {
      const { error } = secondArg

      state.flags[names.loading] = false
      state.flags[names.error] = error.message

      if (rejected) rejected(state, secondArg)
    },
  }
}
