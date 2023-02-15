import React from 'react'
import Provider from '../Provider/Provider'
import getUserToken from '../../utils/getUserToken'
import axios from '../../api/axios'

export type BaseContainerProps = {
  children: React.ReactElement | React.ReactElement[]
}

const BaseContainer: React.FC<BaseContainerProps> = ({ children }) => {
  const [token, setToken] = React.useState<string>()

  React.useEffect(() => {
    ;(async () => {
      const token = await getUserToken()
      axios.defaults.headers['X-USER-ID'] = token

      setToken(token)
    })()
  }, [])

  if (token) {
    return <Provider>{children}</Provider>
  } else {
    return null
  }
}

export default React.memo(BaseContainer)
