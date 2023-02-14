// import { isDevServer } from '../constantes'
// import localStorage from 'redux-persist/lib/storage'
import createChromeStorage from 'redux-persist-chrome-storage'

// использую local вместо sync из-за ограничений на вес данных в хранилище
// export default isDevServer ? localStorage : createChromeStorage(window.chrome, 'local')
export default createChromeStorage(window.chrome, 'local')
