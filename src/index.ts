/**
 * Entry point.
 */
import jquery from 'jquery'

const div: HTMLDivElement = document.createElement('div')
div.textContent = 'Hello World'
document.body.appendChild(div)
console.log(jquery('div').text())
