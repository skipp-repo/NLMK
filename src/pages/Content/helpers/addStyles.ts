const styles = `
  @font-face {
    font-family: "Circe";
    src: url(${chrome.runtime.getURL('Circe.otf')}) format("opentype");
  }
`

export default () => {
  var fa = document.createElement('style')

  fa.textContent = styles

  document.head.appendChild(fa)
}
