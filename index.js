const promiseCode =
`getsy('https://en.wikipedia.org/wiki/"Hello,_World!"_program')
.then(myGetsy => {
  alert(myGetsy.getMe('#firstHeading').text())
})

// Click getMe and wait for it.
// Go to the repo to see the docs and download/install.
`;

var myCodeMirror = CodeMirror(document.getElementById('text-container'), {
  value: promiseCode,
  mode:  "javascript",
  theme: 'material',
  lineNumbers: true,
  autoCloseBrackets: true,
});

function runCode() {
  eval(myCodeMirror.getValue());
}

// const asyncCode = `async function testing(): Promise<{}> {
//   const myGetsy: getsyInst = await getsy('https://en.wikipedia.org/wiki/"Hello,_World!"_program')
//   console.log(myGetsy.getMe('#firstHeading').text())
//   return null
// }

// testing()`
