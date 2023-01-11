import { translation as translationRequest } from '../../api/requests/translation'
import { MAX_TRANSLATION_LENGTH, MIN_TRANSLATION_LENGTH } from '../../constantes'
import * as vocabsSlice from '../../redux/slices/vocabs'
import allCardsIds from '../../redux/slices/vocabs/selectors/allCardsIds'
import { store } from '../../redux/store'
import createTranslationString from '../../utils/createTranslationString'
import Tooltip from '../../utils/Tooltip'
import clickManager from './clickManagerInstanse'
import initUser from './helpers/initUser'
import flatten from 'arr-flatten'

export default class TranslationController {
  abortController = null
  translationResult = null
  token = null
  selectedText = null
  translationRequestError = false
  isBookmarked = false

  constructor() {
    document.addEventListener('selectionchange', this.onSelelectionChange)

    Tooltip.onBookmarkled = this.onBookmarkled
  }

  private async setToken() {
    const token = await initUser()

    if (token) {
      this.token = token
    }
  }

  private setIsBookmarkedByResult() {
    const state = store.getState()

    if (this.translationResult.length > 1) return false

    const id = this.translationResult.map(({ translation }) => translation._id)[0]

    // @ts-ignore
    const allIds = allCardsIds(state)

    this.isBookmarked = allIds.includes(id)
  }

  private async translationRequest() {
    try {
      this.translationResult = false
      this.translationRequestError = false

      const request = await translationRequest(
       { token: this.token, q: this.selectedText },
       { signal: this.abortController.signal },
      )
      const { status, error, data } = request

      if (status !== 200 || error || !data?.results?.length)  {
        this.translationRequestError = true
        this.translationResult = []
        return
      }

      this.translationResult = flatten(data?.results)
    } catch (err) {
      this.translationRequestError = true
    }
  }

  private onSelelectionChange = async (): Promise<void> => {
    const selection: any = document.getSelection()
    let text = selection.toString()

    this.selectedText = text.trim()

    if (this.abortController) {
      this.abortController.abort()
    }

    if (Tooltip.checkNodeInTooltip(clickManager.lastTarget)) {
      return
    }

    if (
      !text.length ||
      !selection.focusNode ||
      text.length > MAX_TRANSLATION_LENGTH ||
      text.length < MIN_TRANSLATION_LENGTH
    ) {
      return
    }

    Tooltip.setLoading()

    if (!this.token) {
      await this.setToken()
    }

    this.abortController = new AbortController()

    await this.translationRequest()

    if (this.translationRequestError) {
      Tooltip.showError("Ошибка выполнения запроса")
      return
    }

    this.setIsBookmarkedByResult()

    const translation = createTranslationString(this.translationResult)

    Tooltip.update(translation, this.isBookmarked)
  }

  private onBookmarkled = async () => {
    const cardsToAdd = this.translationResult.map(({ translation }) => translation._id)

    store.dispatch(vocabsSlice.editFolder({ id: 'default', cardsToAdd }))
  }
}
