import xlsxlib from 'https://jspm.dev/xlsx'
// import xlsxlib from 'https://cdn.skypack.dev/xlsx'
import * as csv from './csv.js'

export async function url_to_tsv(url) {
	// console.log('url_to_tsv')
	let ab = await url_to_ab(url)
	let wb = await ab_to_tsv(ab)
	return wb
}
export async function url_to_ab(url) {
	// let rawData = await Deno.readTextFile(new URL(url))
	let rawData = await fetch(url)
	// console.log(rawData)
	let arrayBuffer = await rawData.arrayBuffer()
	// console.log(arrayBuffer)
	return arrayBuffer
}

export async function toTSV(bytes) {
	let wb = await xlsxlib.read(bytes, { type: 'array' })
	let output = {}
	for (let [name, data] of Object.entries(wb.Sheets)) {
		output[name] = xlsxlib.utils.sheet_to_csv(data, { FS: '\t' })
		// output[name] = xlsxlib.utils.sheet_to_json(data)
	}
	return output
}

export async function toAA(bytes) {
	let wb = await xlsxlib.read(bytes, { type: 'array' })
	let output = {}
	for (let [name, data] of Object.entries(wb.Sheets)) {
		let tmp = xlsxlib.utils.sheet_to_csv(data)
		output[name] = csv.toAA(tmp)
	}
	return output
}

if (import.meta.main) {
	let bytes = await Deno.readFile('Preisatlas.xlsx')
	console.log(await toAA(bytes))
}