import { isDevServer } from '../constantes'
import localStorage from 'redux-persist/lib/storage'
import createChromeStorage from 'redux-persist-chrome-storage'

export default isDevServer ? localStorage : createChromeStorage(window.chrome, 'sync')
