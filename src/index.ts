/**
 * Entry point.
 */
import getsy, { Getsy } from './getsy'
export default getsy // tslint:disable-line export-name
export { Getsy }

// getsy('https://en.wikipedia.org/wiki/"Hello,_World!"_program').then((myGetsy: Getsy) => {
//   console.log(myGetsy.getMe('#firstHeading').text())
// })

// async function testing(): Promise<{}> {
//   const myGetsy: getsyInst = await getsy('https://en.wikipedia.org/wiki/"Hello,_World!"_program')
//   console.log(myGetsy.getMe('#firstHeading').text())
//   return null
// }

// testing()
