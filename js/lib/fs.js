
export async function* listFiles(path, depth = 10) {
	// console.log(path)
	if (depth == 0) return
	path = path.replaceAll('//', '/')
	if (path.endsWith('/')) path = path.slice(0, -1)
	let info = await loadMeta(path)
	// console.log('info', info)
	if (info.isFile) yield path
	if (info.isDirectory)
		for await (let item of Deno.readDir(path)) {
			if (item.isFile) yield path + '/' + item.name
			if (item.isDirectory) yield* listFiles(path + '/' + item.name, depth - 1)
		}
}


export async function loadBytes(path) {
	return await Deno.readFile(path)
}
export async function saveBytes(path, bytes) {
	return await Deno.writeFile(path, bytes)
}


export async function loadText(path) {
	return await Deno.readTextFile(path)
}

export async function saveText(path, text, options = {}) {
	let defaultOptions = { createFolders: true, append: false }
	return await Deno.writeTextFile(path, text)
}



// export async function text(path, text, options = {}) {
// 	if (text) return saveText(path, text, options)
// 	else return loadText(path)
// }

export async function loadMeta(path) {
	return await Deno.stat(path)
}
export async function killFile(path) {

}
export async function copyFile(path) {

}

export async function loadFolder(path, depth = 1) {

}
export async function makeFolder(path) {
	Deno.mkdirSync(path, { recursive: true })
}
export async function killFolder(path) {

}

export async function loadJSON(path) {
	let text = await loadText(path)
	try { return JSON.parse(text) }
	catch { return undefined }
}
export async function saveJSON(path, data) {
	try { var text = JSON.stringify(data) }
	catch { var text = '' }
	return await saveText(path, text)
}


if (import.meta.main) {
	console.log("FS TEST")
	for await (let item of listFiles('test', 5)) {
		console.log(item)
	}
}