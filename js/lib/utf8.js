

export function fromBytes(bytes, options = {}) {
	let defaultOptions = { encoding: 'utf8' }
	let encoding = options.encoding ?? defaultOptions.encoding
	if (Array.isArray(encoding)) {
		for (let enc of encoding) {
			console.log('try',enc)
			let text = new TextDecoder(enc).decode(bytes)
			if (checkDecodingResult(text)) return text
		}
	}
	else return new TextDecoder(encoding).decode(bytes)
	console.log('result to utf8')
	return new TextDecoder('utf8').decode(bytes)
}
export function checkDecodingResult(text) {
	let testChars = 'äÄöÖüÜß'.split('')
	// console.log(testChars)
	for (let test of testChars) {
		// console.log('test',test,text.includes(test))
		if (text.includes(test)) return true
	}
	return false
}

export function recodeFile(path, encoding) {
	if (path.includes('.utf8.')) return
	console.log()// empty row
	console.log(`input`, path)
	console.log(`encoding`, encoding)
	let bytes = Deno.readFileSync(path)
	let text = fromBytes(bytes, { encoding })
	// let utfFile = path.split('.').slice(0, -1).join('.') + '.utf8.' + path.split('.').slice(-1)[0]
	let utfFolder = path.split('/').slice(0, -1).join('/') + '/utf8/'
	let utfFile = path.split('/').slice(-1)[0]
	Deno.mkdirSync(utfFolder, { recursive: true })
	console.log(`output`, utfFolder + utfFile)
	Deno.writeTextFileSync(utfFolder + utfFile, text)
}
import { listFiles } from './fs.js'

// export function recodePath(path, encoding) {
// 	console.log(path)
// 	let info = Deno.statSync(path)
// 	// console.log('info', info)
// 	if (info.isFile) recodeFile(path, encoding)
// 	if (info.isDirectory)
// 		for (let file of Deno.readDirSync(path))
// 			if (file.isFile)
// 				recodeFile(path + '/' + file.name, encoding)
// }


if (import.meta.main) {
	// console.log(Deno.args)
	let [path, encoding] = Deno.args
	if (!path) path = '.'
	if (!encoding) encoding = ['latin1'] // 'utf16le',
	// recodePath(path, encoding)
	for await (let item of listFiles(path,1)) {
		recodeFile(item, encoding)
	}
}