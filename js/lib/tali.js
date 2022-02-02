import * as grid from './grid.js'
// import { log } from 'https://jsv.max.pub/log/2021/ansi.js'
import { log } from '/Users/max/GitHub/_js/log/ansi.js'
// const LOG = log.line.reset.gray.time.tib.silver.counter.tib.gray.bar.tib.reset
// LOG.text('max').line
// LOG.green.text('joo')
const LOG = t => log.line.reset.gray.time.tib.silver.counter.tib.silver.text(`[TALI]`).move(25).gray.bar.tib.reset.text(t)

function measure(name, func) {
	let t0 = Date.now()
	let res = func()
	console.log(new Date().toISOString().slice(11, 19), name, Date.now() - t0, 'ms')
	return res
}
export function since(t, name) {
	console.log(new Date().toISOString().slice(11, 19), name, Date.now() - t, 'ms')
	return Date.now()
}


export function stringify(DD = {}, options) { // {{}} -> tali
	// let t0 = Date.now()
	// let o = fromDD(DD, options)
	// console.log(new Date().toISOString().slice(11, 19), 'TALI.stringify', Date.now() - t0, 'ms for', o.length, 'bytes')
	// return measure('TALI.stringify', x => fromDD(DD, options))
	let t0 = Date.now()
	let aa = grid.dd2aa(DD, options)
	let t1 = Date.now()
	//  = since(t, `TALI.stringify ${aa.length} lines to AA`)
	let str = fromAA(aa, options)
	let t2 = Date.now()
	// t = since(t, `TALI.stringify ${str.length} chars `)
	LOG('stringify').tib.gray.number(str.length).text(' bytes').silver.tib.ms(t2 - t0).tib.bar.tib.ms(t1 - t0).tib.bar.tib.ms(t2 - t1).reset
	return str
}

export function parse(string = '') { // tali -> {{}}
	// let t0 = Date.now()
	// let o = toDD(string)
	// console.log(new Date().toISOString().slice(11, 19), 'TALI.parse', Date.now() - t0, 'ms for', string.length, 'bytes')
	// return o
	// return measure('TALI.parse', x => toDD(string))
	// LOG('parse').line
	let t0 = Date.now()
	let aa = toAA(string)
	let t1 = Date.now()
	// t = since(t, `TALI.parse ${string.length} chars to AA`)
	let dd = grid.aa2dd(aa)
	let t2 = Date.now()
	// t = since(t, `TALI.parse ${aa.length} lines to DD`)
	// LOG('parse').tib.gray.text(string.length + ' bytes').silver.tib.text(`${t2 - t0}ms`).tib.gray.text(`${t1 - t0}ms + ${t2 - t1}ms`).reset
	LOG('parse').tib.gray.number(string.length).text(' bytes').silver.tib.ms(t2 - t0).tib.bar.tib.ms(t1 - t0).tib.bar.tib.ms(t2 - t1).reset
	return dd
	// return toDD(string)
}



export const taliN = '↵'
export const taliT = '⇥'


export function fromString(str) { // js-string -> tali-string
	return String(str).replaceAll('\t', taliT).replaceAll('\n', taliN).trim()
}

export function toString(str) { // tali-string -> js-string
	return String(str).replaceAll(taliT, '\t').replaceAll(taliN, '\n').trim()
}

import * as ID from './id.js'

// console.log(randomString('AAA'))
// console.log(randomStrings('Aa1',9))
export function addIndexColumn(aa, pattern) {
	console.log('add index column with pattern', pattern, aa.length)
	aa = aa.filter(x => x.join('').trim())
	let ids = ID.many(pattern, aa.length)
	ids.unshift('')
	// console.log('ids', ids)
	for (let i in aa)
		aa[i].unshift(ids[i])
	return aa
}
export function fromAA(aa, options = {}) { // [[]] -> tali
	// console.log(aa)
	if (options.addIndexColumn) addIndexColumn(aa, options.addIndexColumn)
	return aa
		.map(x => x
			.map(y => fromString(y))
			.join('\t')
		)
		.join('\n')
}
export function toAA(string) { // tali -> [[]]
	let hasSpecialChars = string.includes(taliN) || string.includes(taliT)
	return string
		.split('\n')
		.filter(x => x.trim())
		.map(x => x
			.split('\t')
			.map(y => hasSpecialChars ? toString(y) : y)
		)
}


export function fromAD(ad) { // [{}] -> tali
	return fromAA(grid.ad2aa(ad))
}
export function toAD(string) { // tali -> [{}] 
	return grid.aa2ad(toAA(string))
}



export function fromDD(dd, options) { // {{}} -> tali
	// return fromAD(grid.dd2ad(dd))
	return fromAA(grid.dd2aa(dd, options))
}
export function toDD(string) { // tali -> {{}}
	return grid.ad2dd(toAD(string))
}





if (import.meta.main) {
	let string = Deno.readTextFileSync('testdata/test2.tali')
	let aa = toAA(string)
	let ad = toAD(string)
	let dd = toDD(string)
	console.log(ad[2])
	console.log(dd)
}