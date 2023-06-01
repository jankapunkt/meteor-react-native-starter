export const simpleRandom = (size = 6) => [...Array(size)]
  .map(() => Math.floor(Math.random() * 16).toString(16))
  .join('')
