class TypeOf {
	constructor(v) {
		try { this.value = JSON.parse(v) }
		catch{ this.value = v; }
	}

	get isBool() {
		return typeof this.value == 'boolean';
	}	
	get isString() {
		return typeof this.value == 'string';
	}
	// get isNumber() {
	// 	return this.value * 1 == this.value;
	// }
	get isInt(){
		return Number.parseInt(this.value) == this.value;
	}
	get isFloat(){
		return Number.parseFloat(this.value) == this.value;
	}

	get isArray() {
		return Array.isArray(this.value);
	}
	get isNull() {
		return this.value === null;
	}
	get isUndefined() {
		return this.value === undefined;
	}

	get isDate() {
		let date = new Date(Date.parse(this.value));
		if (date.getFullYear() > 1970 && date.getFullYear() < 2030)
			return true;
		return false;
	}
	
	get isURL() {
		let url = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/.exec(this.value)?.[0]
	}
	get isEmail(){

	}

	get isTerm(){
		return this.value[0] == '§'
	}
	
	toString() {
		if (this.isArray) return 'array';
		if (this.isDate) return 'date';
		if (this.isBool) return 'isBool';
		if (this.isInt) return 'int';
		if (this.isFloat) return 'float';
		if (this.isNull) return 'null';
		if (this.isTerm) return 'term';
		if (this.isString) return 'string';
	}
}

export default function (v) { return new TypeOf(v) }