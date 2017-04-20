/**
 * @export
 * @class Getsy
 */
import * as jquery from 'jquery'
import { addTrailingSlash } from './utils'

const defaultProxy: string = 'https://crossorigin.me/'

export class Getsy {
  content: string

  constructor(public readonly url: string, onLoad: (err: Error, obj?: Getsy) => void, readonly corsProxy?: string) {
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

export default function getsy(url: string): PromiseLike<{}> {
  return new Promise((resolve: (value?: {} | PromiseLike<{}>) => void, reject: (value?: {} | PromiseLike<{}>) => void) => {
    new Getsy(url, (err: Error, obj: Getsy) => { // tslint:disable-line no-unused-new
      if (err) reject(err)
      resolve(obj)
    })
  })
}
