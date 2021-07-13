export const isLocalhost = location.hostname === 'localhost'
export const isHeroku = location.hostname.includes('herokuapp')
export const isDevServer = isLocalhost || isHeroku
