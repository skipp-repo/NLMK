import chromep from 'chrome-promise'
import { nanoid } from 'nanoid'

export default async (): Promise<string> => {
  if (chromep.identity) {
    const data = await chromep.identity.getProfileUserInfo()

    return data.email
  } else {
    return `${nanoid(20)}-${Date.now()}`
  }
}
