export const searchFiltersReducer = (state, action) => {
  switch (action.type) {
    case 'WordsAndPhrases':
      return { ...state, words: action.selected, phrases: action.selected }
    case 'Words': {
      return { ...state, words: action.selected, phrases: false }
    }
    case 'Phrases':
      return { ...state, words: false, phrases: action.selected }
    case 'Vocabs': {
      let vocabs = state.vocabs

      if (Array.isArray(vocabs)) {
        if (action.selected) {
          vocabs = [...vocabs, action.data.id]
        } else {
          vocabs = vocabs.filter((id) => id !== action.data.id)

          if (!vocabs.length) {
            vocabs = true
          }
        }
      } else {
        if (action.selected) {
          vocabs = [action.data.id]
        }
      }

      return { ...state, vocabs }
    }
    default:
      return state
  }
}
