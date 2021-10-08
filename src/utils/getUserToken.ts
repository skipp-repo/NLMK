import { nanoid } from 'nanoid'

export default async (): Promise<string> => {
  return `${nanoid(20)}-${Date.now()}`
}
