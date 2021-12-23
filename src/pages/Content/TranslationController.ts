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
  isBookmarked = false

  constructor() {
    document.addEventListener('selectionchange', this.onSelelectionChange)

    Tooltip.onBookmarkled = this.onBookmarkled
  }

  private async setToken() {
    this.token = await initUser()
  }

  private setIsBookmarked() {
    const state = store.getState()

    if (this.translationResult.length > 1) return false

    const id = this.translationResult.map(({ translation }) => translation._id)[0]

    // @ts-ignore
    const allIds = allCardsIds(state)

    this.isBookmarked = allIds.includes(id)
  }

  private async translationRequest() {
    const request = await translationRequest(
      { token: this.token, q: this.selectedText },
      { signal: this.abortController.signal },
    )

    if (!request) return

    const { status, error, data } = request

    if (status !== 200 || error || !data?.results?.length) return

    this.translationResult = flatten(data?.results)
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

    if (!this.token) {
      await this.setToken()
    }

    this.abortController = new AbortController()

    Tooltip.setLoading()

    await this.translationRequest()

    this.setIsBookmarked()

    const translation = createTranslationString(this.translationResult)

    Tooltip.update(translation, this.isBookmarked)
  }

  private onBookmarkled = async () => {
    const cardsToAdd = this.translationResult.map(({ translation }) => translation._id)

    store.dispatch(vocabsSlice.editFolder({ id: 'default', cardsToAdd }))
  }
}
