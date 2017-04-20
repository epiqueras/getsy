/**
 * Utility functions.
 */
export function addTrailingSlash(str?: string): string | void { // tslint:disable-line export-name
  return str && str[str.length - 1] !== '/' ? str + '/' : str
}
