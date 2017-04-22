/**
 * Tests for main exports.
 */
import getsy from './index' // tslint:disable-line import-name
import { Getsy } from './getsy'


describe('Main exports:', () => {
  test('Exports default export getsy.', () => {
    expect(getsy).toEqual(expect.anything())
  })
  test('Exports named export Getsy.', () => {
    expect(Getsy).toEqual(expect.anything())
  })
})
