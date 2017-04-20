/**
 * Entry point.
 */
import jquery from 'jquery'

const div: HTMLDivElement = document.createElement('div')
div.textContent = 'Test'
document.body.appendChild(div)
alert(jquery('div').text())
