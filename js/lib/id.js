const base_A = Array(26).fill(1).map((x, i) => String.fromCharCode(65 + i))
const base_a = Array(26).fill(1).map((x, i) => String.fromCharCode(97 + i))
const base_0 = Array(10).fill(1).map((x, i) => String.fromCharCode(48 + i))
export function getBase(pattern) {
	let base = []
	if (pattern.match(/[A-Z]/)) base = base.concat(base_A)
	if (pattern.match(/[a-z]/)) base = base.concat(base_a)
	if (pattern.match(/[0-9]/)) base = base.concat(base_0)
	return base
}
export function one(pattern = '') {
	let base = getBase(pattern)
	return Array(pattern.length).fill(1).map(x => base[Math.floor(Math.random() * base.length)]).join('')
}
export function many(pattern = '', count = 0) {
	if(count > getBase(pattern).length**pattern.length) console.error("PATTERN TOO SHORT")
	let output = new Set()
	while (output.size < count)
		output.add(one(pattern))
	return [...output]
}
