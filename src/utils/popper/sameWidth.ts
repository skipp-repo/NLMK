const MAX_WIDTH_DIFF = 300

const sameWidth = {
  name: 'sameWidth',
  enabled: true,
  phase: 'beforeWrite',
  requires: ['computeStyles'],
  fn: ({ state }) => {
    const width = state.rects.reference.width
    const minWidth = width
    const maxWidth = width > 150 ? width : width + MAX_WIDTH_DIFF

    state.styles.popper.minWidth = `${minWidth}px`
    state.styles.popper.maxWidth = `${maxWidth}px`
  },
  effect: ({ state }) => {
    const width = state.elements.reference.offsetWidth
    const minWidth = width
    const maxWidth = width > 150 ? width : width + MAX_WIDTH_DIFF

    state.elements.popper.style.minWidth = `${minWidth}px`
    state.elements.popper.style.maxWidth = `${maxWidth}px`
  },
}

export default sameWidth
