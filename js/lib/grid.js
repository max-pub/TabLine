
export function aa2ad(aa) { // [[]] -> [{}]
	let cols = aa[0]
	return aa.slice(1).map(line =>
		Object.fromEntries(line.map((x, i) => [cols[i], x]))
	)
}
export function ad2dd(ad) { // [{}] -> {{}}
	return Object.fromEntries(
		ad.map(x => [x[Object.keys(x)[0]], Object.fromEntries(Object.entries(x).slice(1))])
	)
}
export function aa2dd(aa) { return ad2dd(aa2ad(aa)) }



// export function dd2tsv(dd, options) { return aa2tsv(dd2aa(dd, options)) }
export function dd2ad(dd) {
	let ad = []


}
export function ad2aa(ad) {

}
export function dd2aa(dd, options = {}) { // {{}} -> [[]]
	let aa = []
	let cols = [...new Set(Object.keys(dd).flatMap(row => Object.keys(dd[row])))] // iterate all rows to find all different column-keys
	if (options.sortCols) cols = cols.sort()
	for (let row in dd) {
		aa.push([row, ...cols.map(col => dd[row][col] ?? '')])
	}
	let sortCol = -1
	if (options.sortRows) sortCol = 0
	if (options.sortCol && cols.indexOf(options.sortCol) != -1) sortCol = cols.indexOf(options.sortCol) + 1
	// console.log('SORT---', options.sortCol, ' x ', sortCol, ' x ', sortCol != -1)
	if (sortCol != -1) {
		console.log('SORT BY', options.sortCol, ' x ', sortCol)
		// console.log('first row', aa[0])
		aa = aa.sort((a, b) => a[sortCol] > b[sortCol] ? 1 : (a[sortCol] < b[sortCol] ? -1 : 0))
	}
	aa.unshift(['', ...cols]) // list of cols is first row
	return aa
}
