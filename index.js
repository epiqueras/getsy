const infiniteScrollExample =
`// Infinite Scroll Example
getsy('http://scrollmagic.io/examples/advanced/infinite_scrolling.html', { iframe: true })
.then(myGetsy => {
  // myGetsy.showFrame() // Show the frame?

  console.log(myGetsy.getMe('.box1').length + ' boxes.')

  myGetsy.scroll(10).then(({ succesfulTimes, totalRetries }) => {
    console.log('New content loaded ' + succesfulTimes + ' times with ' + totalRetries + ' total retries.')

    console.log(myGetsy.getMe('.box1').length + ' boxes.') // More content!
    
    myGetsy.hideFrame()
  })
})

// Click getMe and open your browser console.
// Go to the repo to see the docs and download/install.
`

var myCodeMirror = CodeMirror(document.getElementById('text-container'), {
  value: infiniteScrollExample,
  mode:  "javascript",
  theme: 'material',
  lineNumbers: true,
  autoCloseBrackets: true,
});

function runCode() {
  eval(myCodeMirror.getValue());
}
