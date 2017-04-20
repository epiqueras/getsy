/**
 * Tests for utility functions.
 */
import { addTrailingSlash } from './utils'

describe('Utility functions:', () => {
  describe('addTrailingSlash:', () => {
    test('Adds trailing slash if not present', () => {
      expect(addTrailingSlash('https://someurl.com/somepath')).toBe('https://someurl.com/somepath/')
    })
    test('Does not add trailing slash if present', () => {
      expect(addTrailingSlash('https://someurl.com/somepath/')).toBe('https://someurl.com/somepath/')
    })
  })
})
