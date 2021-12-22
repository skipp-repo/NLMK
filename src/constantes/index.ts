export const isLocalhost = location.hostname === 'localhost'
export const isHeroku = location.hostname.includes('herokuapp')
export const isDevServer = isLocalhost || isHeroku

export const MAX_TRANSLATION_LENGTH = 500
export const MIN_TRANSLATION_LENGTH = 3
