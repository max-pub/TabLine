import * as csv from './csv.js'
import * as tali from './tali.js'

export function csv2tali(string) {
	return tali.fromAA(csv.toAA(string))
}