import * as grid from './grid.js'


export function stringify(DD, options) { // {{}} -> tali
	return fromDD(DD, options)
}

export function parse(string) { // tali -> {{}}
	return toDD(string)
}



export const taliN = '↵'
export const taliT = '⇥'


export function fromString(str) { // js-string -> tali-string
	return String(str).replaceAll('\t', taliT).replaceAll('\n', taliN)
}

export function toString(str) { // tali-string -> js-string
	return String(str).replaceAll(taliT, '\t').replaceAll(taliN, '\n')
}



export function fromAA(aa) { // [[]] -> tali
	// console.log(aa)
	return aa
		.map(x => x
			.map(y => fromString(y))
			.join('\t')
		)
		.join('\n')
}
export function toAA(string) { // tali -> [[]]
	return string
		.split('\n')
		.filter(x => x.trim())
		.map(x => x
			.split('\t')
			.map(y => toString(y).trim())
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





