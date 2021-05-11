const CleanCSS = require('clean-css')
const fs = require('fs')
const CSS_DIR = fs.readdirSync('./docs/unlogged/styles')
// const css = fs.readFileSync('./dist/styles/common.css') 
// const output = new CleanCSS().minify(css)

CSS_DIR.forEach(file => {
    const data = new CleanCSS().minify(['./docs/unlogged/styles' + '/' + file])
    console.log(data.styles)
    fs.writeFileSync('./opt' + '/' + file, data.styles)
})

// console.log(CSS_DIR)
// fs.writeFileSync('./dist/test.css', output.styles)
// console.log(output.styles)