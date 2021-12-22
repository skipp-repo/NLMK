const sameWidth = {
  name: 'sameWidth',
  enabled: true,
  phase: 'beforeWrite',
  requires: ['computeStyles'],
  fn: ({ state }) => {
    state.styles.popper.minWidth = `${state.rects.reference.width}px`
    state.styles.popper.maxWidth = `${state.rects.reference.width + 150}px`
  },
  effect: ({ state }) => {
    state.elements.popper.style.minWidth = `${state.elements.reference.offsetWidth}px`
    state.elements.popper.style.maxWidth = `${state.elements.reference.offsetWidth + 150}px`
  },
}

export default sameWidth
