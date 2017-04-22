/**
 * Tests for main functionality.
 */
import getsy, { Getsy } from './index' // tslint:disable-line import-name


describe('Main exports:', () => {
  test('Getsy fetches a document.', async () => {
    const myGetsy: Getsy = await getsy('http://scrollmagic.io/examples/advanced/infinite_scrolling.html')
    expect(myGetsy).toEqual(expect.anything())
  })
})
