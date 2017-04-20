/**
 * Tests for main exports.
 */
import getsy, { Getsy } from './index' // tslint:disable-line import-name

declare global {
  namespace jest {
    interface Matchers {
      resolves: Matchers,
    }
  }
}

describe('Main exports:', () => {
  test('Exports default export getsy', () => {
    return expect(getsy).toEqual(expect.anything())
  })
  test('Exports named export Getsy', () => {
    return expect(Getsy).toEqual(expect.anything())
  })
})
