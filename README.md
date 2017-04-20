# Getsy
> A simple browser/client-side web scraper.

<br />

## Installation options:
+ Run `npm install --save getsy` or `yarn add getsy`
+ Download the [umd](https://github.com/epiqueras/getsy/releases/download/v0.6.0/getsy.js) build and link it using a script tag

<br />

## How to use:
This library exposes a single function:
`getsy(url: string, corsProxy: string): Promise<{}>`

parameters:
+ url: The url of the website you wish to scrape.
+ corsProxy(optional): The endpoint of the corsProxy you wish to use. (Read corsProxy for more info).

The function returns a promise that resolves to a Getsy object on success and rejects if it was unable to load the requested page.

Getsy objects have a method `getMe` for scraping the resource's contents. This method is just a wrapper over the jQuery function so you can chain other jQuery methods on it. If you need to use the raw data you can access it's `content` property.

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

## CorsProxy:
This library uses a corsProxy to get by the CORS Origin issue.
If you don't provide one it will default to: `https://crossorigin.me/`.

Some node CorsProxy servers:
+ [cors-anywhere](https://github.com/Rob--W/cors-anywhere)
+ [CORS-Proxy](https://github.com/gr2m/CORS-Proxy)
