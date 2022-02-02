import * as tali from '../mod.js'


export function csv_to_tali(bytes, options = {}) {
	options = { ...{}, ...options }
	let text = tali.utf8.fromBytes(bytes, options)
	console.log('convert csv to AA')
	let aa = tali.csv.toAA(text, options)
	// console.log(aa)
	console.log('convert AA to tali')
	let outText = tali.tali.fromAA(aa, options)
	console.log('recode tali')
	// outText = tali.tali.stringify(tali.tali.parse(outText))
	let outBytes = new TextEncoder().encode(outText)
	return outBytes
}
export async function csv_folder_to_tali(path) {
	for await (let file of tali.fs.listFiles(path)) {
		console.log('convert',file)
		let input = await tali.fs.loadBytes(file)

		let output = csv_to_tali(input, { encoding: ['latin1'], addIndexColumn: 'ABCD' })

		await tali.fs.saveBytes(file.replace(/\.csv/i, '.tali'), output)
	}
}


if (import.meta.main) {
	let path = Deno.args[0]
	csv_folder_to_tali(path)
}
