export default (node, parentClassName) => {
  if (!node || !node.closest) return false

  return node.closest(`.${parentClassName}`)
}
