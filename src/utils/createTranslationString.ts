export default (items) =>
  items?.map(({ translation }) => (translation?.translation || '').trim()).join(', ')
