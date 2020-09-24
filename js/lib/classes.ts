export class ISO_Date {
	year: number
	month: number
	day: number
	constructor(iso: string) {
		let parts: Array<string> = iso.split('-')
		this.year = Number.parseInt(parts[0]);
		this.month = Number.parseInt(parts[1]);
		this.day = Number.parseInt(parts[2]);
		console.log(this.toDate() == this.toString())
	}
	toString() {
		return this.year + '-' + this.month + '-' + this.day;
	}
	toDate() {
		return new Date(this.year, this.month - 1, this.day, 0, 0, 0).toISOString().substr(0, 10)
	}
	get json() { return { year: this.year } }
}

function toInt(v: any) {
	let tmp = Number.parseInt(v);
	if (Number.isNaN(tmp)) throw new TypeError(v + ' is not an integer')
	return tmp;
}
function toReal(v: any) {
	let tmp = Number.parseFloat(v);
	if (Number.isNaN(tmp)) throw new TypeError(v + ' is not a floating point number')
	return tmp;
}

function assertLetter(v: string) {

}
console.log(new ISO_Date('2020-05-30').toDate())