const dropcss = require('dropcss');
const fs = require('fs')
// super mega-huge combined stylesheet
let css = fs.readFileSync('./src/assets/fonts/all.min.css', 'utf-8')
console.log(css)

// html of page (or state) A
let htmlDir = fs.readdirSync('./docs/unlogged/')
    .filter(item => {
        if (/\.html$/.test(item)) return true
    });

console.log(htmlDir)

// whitelist
let whitelist = new Set();

let res = []
htmlDir.forEach(chunk => {

    const html = fs.readFileSync('./docs/unlogged' + '/' + chunk, 'utf-8').toString()
   
    res.push(dropcss({
        css,
        html
    }))

})


res.forEach( async chunk => {
    await chunk.sels.forEach(sel => whitelist.add(sel));
})

console.log('WHITELIST: ', whitelist)

// final purge relying only on accumulated whitelist

let cleaned = dropcss({
	html: '',
	css,
	shouldDrop: sel => !whitelist.has(sel),
});

fs.writeFileSync('./src/assets/fonts/fa5-opt.css', cleaned.css)