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

export type scrollResolve = { succesfulTimes: number, totalRetries: number }

const defaults: options = {
  corsProxy: 'https://crossorigin.me/',
  resolveURLs: true,
  iframe: false,
}

export class Getsy {
  content: string
  readonly corsProxy: string
  iframe: HTMLIFrameElement
  iframeDoc: Document

  constructor(public readonly url: string, onLoad: (err: Error, obj?: Getsy) => void, {
    corsProxy = defaults.corsProxy,
    resolveURLs = defaults.resolveURLs,
    iframe = defaults.iframe,
  }: options = defaults) {
    this.corsProxy = corsProxy

    jquery.get(addTrailingSlash(corsProxy) + url, 'html').done((data: string) => {
      this.content = resolveURLs ? resolveRelativeURLs(data, url) : data

      if (iframe) { // Load iframe:
        const { width = '100%', height = '100%' } = <{ width: string, height: string }>iframe

        // Make iframe script:
        const iframeScript: HTMLScriptElement = document.createElement('script')
        iframeScript.textContent = 'document.open();document.write(' + JSON.stringify(this.content) + ');document.close()'

        // Make and append iframe element:
        const iframeEl: HTMLIFrameElement = document.createElement('iframe')
        iframeEl.className = 'getsy-frame'
        iframeEl.style.width = width
        iframeEl.style.height = height
        iframeEl.style.position = 'fixed'
        iframeEl.style.opacity = '0'
        iframeEl.style.zIndex = '-1000'
        iframeEl.style.pointerEvents = 'none'
        document.body.appendChild(iframeEl)

        // Append iframe script to iframe element:
        const iframeDoc: Document = iframeEl.contentDocument || iframeEl.contentWindow.document
        iframeDoc.body.appendChild(iframeScript)

        // Save a reference to the iframe and doc.
        this.iframe = iframeEl
        this.iframeDoc = iframeDoc

        return iframeEl.contentWindow.onload = () => onLoad(null, this)
      }

      return onLoad(null, this)
    }).fail(() => onLoad(Error('Failed to load site.')))
  }

  getMe(sel: string): JQuery {
    return jquery(sel, this.iframeDoc || this.content)
  }

  scroll(
    numberOfTimes: number,
    element: HTMLElement = this.getMe('body')[0],
    interval: number = 2000, retries: number = 5,
  ): Promise<scrollResolve> {
    return new Promise<scrollResolve>((resolve: (value: scrollResolve) => void, reject: (error: Error) => void) => {
      if (!this.iframe) return reject(Error('Scroll can only be used in iframe mode.'))
      if (numberOfTimes < 1) return reject(Error('Number of times is less than 1.'))

      let times: number = numberOfTimes // Keep track of times.
      let totalRetries: number = 0 // Keep track of how many retries per time.
      const initialHeight: number = element.scrollHeight // Save initialHeight for resolve message.

      let lastHeight: number = initialHeight // Keep track of last height.
      let tries: number = 0 // Keep track of retries.
      element.scrollTop = initialHeight // Scroll down.

      setTimeout(function infiniteScroll(): any { // tslint:disable-line no-function-expression
        if (lastHeight < element.scrollHeight) { // New content loaded:
          lastHeight = element.scrollHeight
          element.scrollTop = lastHeight
          totalRetries += tries
          times -= 1
          if (times <= 0) return resolve({ succesfulTimes: numberOfTimes - times, totalRetries })
          tries = 0
          return setTimeout(infiniteScroll, interval) // Get more content.
        }

        // No new content yet:
        element.scrollTop = element.scrollHeight // Try scrolling again.
        tries += 1
        if (tries >= retries) return resolve({ succesfulTimes: numberOfTimes - times, totalRetries })
        setTimeout(infiniteScroll, interval) // Retry
      }, interval)
    })
  }

  hideFrame(): void {
    this.iframe.style.opacity = '0'
    this.iframe.style.zIndex = '-1000'
    this.iframe.style.pointerEvents = 'none'
  }

  showFrame(): void {
    this.iframe.style.opacity = '1'
    this.iframe.style.zIndex = '1000'
    this.iframe.style.pointerEvents = 'auto'
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
