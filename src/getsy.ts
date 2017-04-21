/**
 * @export
 * @class Getsy
 */
import jquery from 'jquery'
import { addTrailingSlash } from './utils'

const defaultProxy: string = 'https://crossorigin.me/'

export class Getsy {
  content: string
  readonly corsProxy: string

  constructor(public readonly url: string, onLoad: (err: Error, obj?: Getsy) => void, corsProxy?: string) {
    if (!corsProxy) this.corsProxy = defaultProxy
    else this.corsProxy = corsProxy
    jquery.get(addTrailingSlash(this.corsProxy) + url, 'html').done((data: string) => {
      this.content = data
      onLoad(null, this)
    }).fail(() => onLoad(Error('Failed to load site.')))
  }

  getMe(sel: string): JQuery {
    return jquery(sel, this.content)
  }
}

export default function getsy(url: string, corsProxy?: string): Promise<Getsy> {
  return new Promise<Getsy>((resolve: (value: Getsy) => void, reject: (error: Error) => void) => {
    new Getsy(url, (err: Error, obj: Getsy) => { // tslint:disable-line no-unused-new
      if (err) reject(err)
      resolve(obj)
    }, corsProxy)
  })
}
