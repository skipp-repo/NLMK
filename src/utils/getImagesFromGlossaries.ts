import find from 'lodash.find'
import { getImagePathFromBuffer } from './getImagePathFromBuffer'

export default (glossaryId, glossaries): string[] => {
  if (!glossaries || !glossaryId) return []

  const glossary = glossaryId ? find(glossaries, { _id: glossaryId }) : undefined

  if (!glossary) return []

  const { glossaryPicts } = glossary

  if (!glossaryPicts) {
    return []
  }

  const sizes = [glossaryPicts.size1, glossaryPicts.size2, glossaryPicts.size3].filter(
    (item) => !!item,
  )

  return sizes.map((item) => getImagePathFromBuffer(item.data))
}
