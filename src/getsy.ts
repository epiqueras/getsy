/**
 * @export
 * @class Getsy
 */
import jquery from 'jquery'
import { addTrailingSlash, resolveRelativeURLs } from './utils'

export type options = {
  corsProxy?: string
  resolveURLs?: boolean
  iframe?: boolean | { width: string, height: string },
}

const defaults: options = {
  corsProxy: 'https://crossorigin.me/',
  resolveURLs: true,
  iframe: false,
}

export class Getsy {
  content: string
  readonly corsProxy: string
  readonly iframe: HTMLIFrameElement

  constructor(public readonly url: string, onLoad: (err: Error, obj?: Getsy) => void, {
    corsProxy = defaults.corsProxy,
    resolveURLs = defaults.resolveURLs,
    iframe = defaults.iframe,
  }: options = defaults) {

    this.corsProxy = corsProxy
    // this.iframe = iframe

    jquery.get(addTrailingSlash(corsProxy) + url, 'html').done((data: string) => {
      this.content = resolveURLs ? resolveRelativeURLs(data, url) : data
      onLoad(null, this)
    }).fail(() => onLoad(Error('Failed to load site.')))
  }

  getMe(sel: string): JQuery {
    return jquery(sel, this.content)
  }
}

export default function getsy(url: string, options?: options): Promise<Getsy> {
  return new Promise<Getsy>((resolve: (value: Getsy) => void, reject: (error: Error) => void) => {
    new Getsy(url, (err: Error, obj: Getsy) => { // tslint:disable-line no-unused-new
      if (err) reject(err)
      resolve(obj)
    }, options)
  })
}
