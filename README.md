# Getsy
> A simple browser/client-side web scraper.
> Try it out in a REPL:
[http://www.getgetsy.com](http://www.getgetsy.com)

>> TODOS:
>> + [x] Support for websites with infinite scroll.
>> + [ ] Support for websites with click pagination.

<br />

## Installation options:
+ Run `npm install --save getsy` or `yarn add getsy`
+ Download the [umd](https://github.com/epiqueras/getsy/releases/download/v0.9.0/getsy.js) build and link it using a script tag

<br />

## How to use:
This library exposes a single function:
`getsy(url: string, optionsObject?: options): Promise<Getsy>`

**parameters:**
+ `url`: The url of the website you wish to scrape.

+ `optionsObject`*(optional)*:

  + `corsProxy`*(optional string)*: The endpoint of the corsProxy you wish to use. *(Read corsProxy for more info)*

  + `resolveURLs`*(optional boolean)*: Wether you want getsy to resolve all relative urls in the resource to absolute urls so they don't fail when they load in another page. *(defaults to true)*

  + `iframe`: A boolean or object with width and height properties indicating if getsy should start in iframeMode or not. iframe mode will wait for the resource to be mounted in a hidden iframe so you can extract more data through pagination or infinite scrolling. *(defaults to false)*


The function returns a promise that resolves to a Getsy object on success and rejects if it was unable to load the requested page.

Getsy objects have a method `getMe` for scraping the resource's contents. This method is just a wrapper over the jQuery function so you can chain other jQuery methods on it. If you need to use the raw data you can access it's `content` property. *(More on Getsy below)*


### Example (Promises):

```js
import getsy from 'getsy'

getsy('https://en.wikipedia.org/wiki/"Hello,_World!"_program').then(myGetsy => {
  console.log(myGetsy.getMe('#firstHeading').text())
})
```


### Example (Async/Await):

```js
import getsy from 'getsy'

async function testing() {
  const myGetsy = await getsy('https://en.wikipedia.org/wiki/"Hello,_World!"_program')

  console.log(myGetsy.getMe('#firstHeading').text())
}

testing()
```


### Here's how you might use it with a website that has infinite scrolling:

```js
async function infiniteScrape() {
  myGetsy = await getsy('http://scrollmagic.io/examples/advanced/infinite_scrolling.html', { iframe: true })
  
  console.log(`${myGetsy.getMe('.box1').length} boxes.`)
  
  const { succesfulTimes, totalRetries } = await myGetsy.scroll(10)
  
  console.log(`New content loaded ${succesfulTimes} times with ${totalRetries} total retries.`)
  console.log(`${myGetsy.getMe('.box1').length} boxes.`) // More content!
}

infiniteScrape()
```

<br />

## The Getsy Object:
The Getsy object has the following properties and methods:

+ `corsProxy`: The same one passed from the options object or the default value.

+ `content`: The original string data received from the request.

+ `iframe`: A reference to its iframe element if in iframe mode.

+ `iframeDoc`: A reference to its iframe's document if in iframe mode.

+ `content`: The original string data received from the request.

+ `getMe(selector: string): JQuery`: Query the resource's DOM or the iframe if in iframe mode with a jQuery selector. Returns a JQuery object.

+ `scroll(numberOfTimes: number, element?: HTMLElement, interval?: number, retries?: number): Promise<scrollResolve>`: Scroll to the bottom of an `element` to load new data a specified `numberOfTimes`. The `interval` *(defaults to 2000)* is the time in milliseconds that Getsy waits before checking if new content has loaded. If no new content has loaded it will retry as many times as specified by `retries` *(defaults to 5)*. If no new content has loaded and `scroll` is out of retries then it will resolve the Promise early to avoid waiting for the remaining `numberOfTimes`. Note: retries reset to 0 on every succesful content load. Returns a Promise that resolves to an object with the number of `.succesfulTimes` that new content was loaded and the `.totalRetries`.

+ `hideFrame(): void`: Hides the iframe if applicable.

+ `showFrame(): void`: Shows the iframe if applicable.

<br />

## CorsProxy:
This library uses a corsProxy to get by the CORS Origin issue.
If you don't provide one it will default to: `https://crossorigin.me/`.

Some node CorsProxy servers:
+ [cors-anywhere](https://github.com/Rob--W/cors-anywhere)
+ [CORS-Proxy](https://github.com/gr2m/CORS-Proxy)
