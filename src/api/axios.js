import axios from 'axios'
import secrets from 'secrets'

const { API_URL } = secrets

const instance = axios.create({
  baseURL: API_URL,
})

instance.defaults.headers['Content-Type'] = 'application/json'

export default instance
