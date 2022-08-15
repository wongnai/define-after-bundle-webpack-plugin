const fs = require('fs')
const path = require('path')

const rootPath = process.cwd()
const buildScriptPath = path.join('build', 'index.js')
const buildImagePath = path.join('build', 'media/image.png')

const testPath = path.join(rootPath, 'test')
const outputScriptPath = path.join(testPath, buildScriptPath)
const sourceMapPath = `${outputScriptPath}.map`

const inputImagePath = 'test/image.png'

const outputImagePath = path.join(testPath, buildImagePath)

const outputText = fs.readFileSync(outputScriptPath).toString()

const inputImageText = fs.readFileSync(inputImagePath).toString()

const outputImageText = fs.readFileSync(outputImagePath).toString()

if (inputImageText !== outputImageText) {
	throw new Error('Generated asset is incorrect')
}

if (!outputText.includes('"New Value"')) {
	throw new Error('No replacement found in build')
}

const sourceMapText = fs.readFileSync(sourceMapPath).toString()

if (!sourceMapText.includes('console.log(process.env.TEST)')) {
	throw new Error('Generated Sourcemap is incorrect')
}

console.log('This plugin is fine to be used.')
