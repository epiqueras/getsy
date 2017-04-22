/**
 * Utility functions.
 */
import { join } from 'path'

export function addTrailingSlash(str?: string): string { // tslint:disable-line export-name
  return str && str[str.length - 1] !== '/' ? str + '/' : str
}

const urlsRE: RegExp = /(src|href|srcset)=("|')(?!http)(\/{0,2})((?:(?!\2).)*)\2/g

const trailExtRE: RegExp = /(?!.+\/).+\.html$/

const joinFixRE: RegExp = /^(https?:)\//
const joinFixRP: string = '$1//'

export function resolveRelativeURLs(html: string, url: string): string {
  const protocol: 'https://' | 'http://' = url.slice(0, 5) === 'https' ? 'https://' : 'http://'
  const base: string = addTrailingSlash(url.replace(trailExtRE, ''))

  return html.replace(urlsRE, (m: string, attr: string, quot: string, leadSlashes: string, href: string) =>
    attr + '=' + quot + (leadSlashes === '//' ? (protocol + href) : join(base, href).replace(joinFixRE, joinFixRP)) + quot,
  )
}
