import * as React from 'react'
import useReduxAction from './useReduxAction'
import * as userSlice from '../redux/slices/user'
import axios from '../api/axios'

export default () => {
  const reduxAction = useReduxAction()

  const getStatus = reduxAction(userSlice.getStatus)

  React.useEffect(() => {
    getStatus()
  }, [])
}
