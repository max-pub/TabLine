// import * as papa from 'https://unpkg.com/papaparse@5.3.1/papaparse.min.js'
import papaparse from 'https://cdn.skypack.dev/papaparse';
import * as grid from './grid.js'


export function toAA(csv, options = {}) {
	let defaultOptions = { delimiter: ';' }
	return papaparse.parse(csv).data
}
export function toAD(string) {
	return grid.aa2ad(toAA(string))
}



// export function convertFile(path) {
// 	if (!path.toLowerCase().endsWith('.csv')) return
// 	console.log()
// 	console.log('input', path)
// 	let csv = Deno.readTextFileSync(path)
// 	let tsv = csv2tsv(csv)
// 	// let output = path.replace(/\.csv/i, '') + '.tsv'
// 	let targetFolder = path.split('/').slice(0, -1).join('/') + '/tsv/'
// 	let targetFile = path.split('/').slice(-1)[0].replace(/\.csv/i, '') + '.tsv'
// 	console.log('output', targetFolder + targetFile)
// 	Deno.mkdirSync(targetFolder, { recursive: true })
// 	Deno.writeTextFileSync(targetFolder + targetFile, tsv)
// }
// export function convertPath(path) {
// 	console.log(path)
// 	let info = Deno.statSync(path)
// 	// console.log('info', info)
// 	if (info.isFile) convertFile(path)
// 	if (info.isDirectory)
// 		for (let file of Deno.readDirSync(path))
// 			if (file.isFile)
// 				convertFile(path + '/' + file.name)
// }

// if (import.meta.main) {
// 	let path = Deno.args[0]
// 	convertPath(path)
// }