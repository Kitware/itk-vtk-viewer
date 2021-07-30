#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const glob = require('glob')
const svgToMiniDataURI = require('mini-svg-data-uri')

try {
  fs.mkdirSync('dist')
} catch (err) {
  if (err.code !== 'EEXIST') throw err
}

const svgFiles = glob.sync(path.join('src', '*.svg'))
const icons = new Map()
svgFiles.forEach(svgFile => {
  const contents = fs.readFileSync(svgFile, { encoding: 'utf8', flag: 'r' })
  const optimizedSVGDataURI = svgToMiniDataURI(contents)
  const moduleContents = `const optimizedSVGDataUri = "${optimizedSVGDataURI}"

export default optimizedSVGDataUri
`
  const basename = path.basename(svgFile, '.svg')
  icons.set(`${basename}IconDataUri`, `./${basename}.svg.uri.js`)
  fs.writeFileSync(path.join('dist', `${basename}.svg.uri.js`), moduleContents)
})

const indexFile = path.join('dist', 'index.js')
const indexFD = fs.openSync(indexFile, 'w')
for (const [varName, modulePath] of icons) {
  fs.writeSync(
    indexFD,
    `export { default as ${varName} } from "${modulePath}"\n`
  )
}
fs.closeSync(indexFD)
