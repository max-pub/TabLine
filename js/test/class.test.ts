export class person {
	#value: undefined
	#age: number
	set age(v:any){ this.#age = toInt(v) }
	get age(){ return this.#age }
	
	#name: person_name
	#birth: ISO_Date
	#married: boolean
	#sex: person_sex
}
class person_name {
	#first: string
	#last: person_name_last
}
class person_name_last {
	#value: string
	#side: person_name_last_side
}
enum person_name_last_side {
	father='father', 
	mother='mother'
}
enum person_sex {
	m='m', 
	f='f'
}
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
	if (Number.isNaN(tmp)) throw new Error(v + ' is not an integer')
	return tmp;
}
function toReal(v: any) {
	let tmp = Number.parseFloat(v);
	if (Number.isNaN(tmp)) throw new Error(v + ' is not an integer')
	return tmp;
}
console.log(new ISO_Date('2020-05-30').toDate())