export type FilterItem = {
  type: string
  key: string
  name: string
  selected: boolean
  data?: any
}

export type Filter = {
  name: string
  items: FilterItem[]
}

export type Filters = Filter[]
