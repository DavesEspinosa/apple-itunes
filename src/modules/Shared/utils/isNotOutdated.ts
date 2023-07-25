export const isNotOutdated = (value: number): boolean => {
  const oneDay = 60 * 60 * 24 * 1000
  return oneDay > Date.now() - value
}
