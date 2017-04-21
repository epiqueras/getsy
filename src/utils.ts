/**
 * Utility functions.
 */
export function addTrailingSlash(str?: string): string { // tslint:disable-line export-name
  return str && str[str.length - 1] !== '/' ? str + '/' : str
}

export function resolveRelativeURLs(html: string, url: string): string {
  const protocol: 'https://' | 'http://' = url.slice(0, 5) === 'https' ? 'https://' : 'http://'
  const base: string = addTrailingSlash(url)

  return html.replace(/(src|href|srcset)=("|')(?!http)(\/{0,2})((?:(?!\2).)*)\2/g,
    (m: string, attr: string, quot: string, leadSlashes: string, path: string) =>
      attr + '=' + quot + (leadSlashes === '//' ? (protocol + path) : (base + path)) + quot,
  )
}
