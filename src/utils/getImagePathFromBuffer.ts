import memoize from 'lodash.memoize'

export const getImagePathFromBuffer = memoize((data) => {
  let uint8Array = new Uint8Array(data)
  let blob = new Blob([uint8Array.buffer])
  return URL.createObjectURL(blob)
})
