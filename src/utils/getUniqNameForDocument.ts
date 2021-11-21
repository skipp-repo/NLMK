const fileNameRegex = /(.+)\.docx|(.+)/

const checkNameIsUnic = (name, names): boolean => !names.includes(name)

const createName = (name, count) => {
  const matchResult = name.match(fileNameRegex)
  const resultName = matchResult[1] || matchResult[0]

  return `${resultName} (${count})`
}

const getUniqNameForDocument = (name: string, names: string[]) => {
  let count = 1
  let generatedName = name
  const namesWithoutExt = names.map((item) => item.match(fileNameRegex)[1])

  while (!checkNameIsUnic(generatedName, namesWithoutExt)) {
    count++
    generatedName = createName(name, count)
  }

  return generatedName
}

export default getUniqNameForDocument
