export const vocabsFiltersReducer = (state, action) => {
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

export const glossariesFiltersReducer = (state, action) => {
  switch (action.type) {
    case 'WordsAndPhrases':
      return { ...state, words: action.selected, phrases: action.selected }
    case 'Words': {
      return { ...state, words: action.selected, phrases: false }
    }
    case 'Phrases':
      return { ...state, words: false, phrases: action.selected }
    case 'Glossary': {
      let glossaries = state.glossaries

      if (Array.isArray(glossaries)) {
        if (action.selected) {
          glossaries = [...glossaries, action.data.id]
        } else {
          glossaries = glossaries.filter((id) => id !== action.data.id)

          if (!glossaries.length) {
            glossaries = true
          }
        }
      } else {
        if (action.selected) {
          glossaries = [action.data.id]
        }
      }

      return { ...state, glossaries }
    }
    default:
      return state
  }
}
