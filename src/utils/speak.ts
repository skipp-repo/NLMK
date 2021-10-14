const u = new SpeechSynthesisUtterance()

export default (word: string, lang) => {
  const synth = window.speechSynthesis

  u.text = word
  u.lang = lang
  u.rate = 0.8

  synth.speak(u)
}
