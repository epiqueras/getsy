/**
 * Tests for utility functions.
 */
import { addTrailingSlash, resolveRelativeURLs } from './utils'

const sampleURL: string = 'http://www.example.com'
const sampleHTTPSURL: string = 'https://www.example.com'

const sampleHTML: string =
`
wda src="http://regexr.com/foo.html?q=bar" dawdwda href="http://regexr.com/foo.html?q=bar" dawd
adw src="http://mediatemple.net" dawdawadw href="https://mediatemple.net" dawdaw
adw src='//media.http.atemple.net' dawdawadw href="//mediatemplehttpsnet" dawdaw
adw src='/mediatemple.net' dawdawadw href="/mediatemple.net" dawdaw
adw src='mediatemple.net' dawdawadw href="mediatemple.net" dawdaw
adw srcset='/mediatemple.net' dawdawadw srcset="mediatemple.net" dawdaw
`

const resolvedHTML: string =
`
wda src="http://regexr.com/foo.html?q=bar" dawdwda href="http://regexr.com/foo.html?q=bar" dawd
adw src="http://mediatemple.net" dawdawadw href="https://mediatemple.net" dawdaw
adw src='http://media.http.atemple.net' dawdawadw href="http://mediatemplehttpsnet" dawdaw
adw src='http://www.example.com/mediatemple.net' dawdawadw href="http://www.example.com/mediatemple.net" dawdaw
adw src='http://www.example.com/mediatemple.net' dawdawadw href="http://www.example.com/mediatemple.net" dawdaw
adw srcset='http://www.example.com/mediatemple.net' dawdawadw srcset="http://www.example.com/mediatemple.net" dawdaw
`

const resolvedHTTPSHTML: string =
`
wda src="http://regexr.com/foo.html?q=bar" dawdwda href="http://regexr.com/foo.html?q=bar" dawd
adw src="http://mediatemple.net" dawdawadw href="https://mediatemple.net" dawdaw
adw src='https://media.http.atemple.net' dawdawadw href="https://mediatemplehttpsnet" dawdaw
adw src='https://www.example.com/mediatemple.net' dawdawadw href="https://www.example.com/mediatemple.net" dawdaw
adw src='https://www.example.com/mediatemple.net' dawdawadw href="https://www.example.com/mediatemple.net" dawdaw
adw srcset='https://www.example.com/mediatemple.net' dawdawadw srcset="https://www.example.com/mediatemple.net" dawdaw
`

describe('Utility functions:', () => {
  describe('addTrailingSlash:', () => {
    test('Adds trailing slash if not present.', () => {
      expect(addTrailingSlash('https://someurl.com/somepath')).toBe('https://someurl.com/somepath/')
    })
    test('Does not add trailing slash if present.', () => {
      expect(addTrailingSlash('https://someurl.com/somepath/')).toBe('https://someurl.com/somepath/')
    })
  })

  describe('resolveRelativeURLs:', () => {
    test('Resolves all relative URLs from an insecure resource.', () => {
      expect(resolveRelativeURLs(sampleHTML, sampleURL)).toBe(resolvedHTML)
    })
    test('Resolves all relative URLs from a secure resource.', () => {
      expect(resolveRelativeURLs(sampleHTML, sampleHTTPSURL)).toBe(resolvedHTTPSHTML)
    })
  })
})
