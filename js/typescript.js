// import * as lib from './lib/classes.ts';
const constraintTypes = {
	int: key => `number
	set ${key}(v:any){ this.#${key} = toInt(v) }
	get ${key}(){ return this.#${key} }
	`,
	real: key => `number
	set ${key}(v:any){ this.#${key} = toReal(v) }
	get ${key}(){ return this.#${key} }
	`
}
const simpleTypes = {
	string: 'string',
	date: 'ISO_Date',
	bool: 'boolean',
}
// const setters = {
// 	int: key => `this.#${key} = Number.parseInt(v)`
// }
const classes = {}

function path(item) {
	let p = [item.$key];
	while (item.$level > 0) {
		item = item.$parent
		p.unshift(item.$key)
		// console.log(item.$level, item.$key)
	}
	return p
}


function typeDef(item) {
	// let key = item.$key;
	let type = item.$type?.toLowerCase()
	// console.log('type of',item);
	let prefix = `\t#${item.$key}: `
	if (simpleTypes[type] && item.$children.length == 0)
		return prefix + simpleTypes[type];
	else if (constraintTypes[type] && item.$children.length == 0)
		return prefix + constraintTypes[type](item.$key);
	else return prefix + path(item).join('_');
}

export default function toTypeScript(item) {
	let string = '';
	if (item.$level >= 0) {
		// if (item.$children.length == 0) {
		// 	string += item.$key + ':' + item.$type
		// } else
		// console.log(item)
		switch (item.$type?.toLowerCase()) {
			case 'enum':
				string += `enum ${path(item).join('_')} {\n\t${item.$constraints.map(x => `${x.replace('/', '_')}='${x}'`).join(', \n\t')}\n}\n`;
				break;

			default:
				string += `class ${path(item).join('_')} {\n`
				if (item.$type)
					string += `\t#value: ${simpleTypes[item.$type.toLowerCase()]}\n`
				for (let child of item.$children ?? []) {
					let key = child.$key
					let type = child.$type?.toLowerCase()
					string += typeDef(child) + '\n';
					// string += `\t#${key}: ${typeDef(child)}\n`;
					// if (setters[type])
					// 	string += `\tset ${key}(v){\n${setters[type](key)}\n}\n`
				}
				string += `}\n`;
				break;
		}
		if (item.$level == 0) string = 'export ' + string;
	}
	for (let child of item.$children ?? [])
		if (child.$children.length > 0 || child.$type.toLowerCase() == 'enum')
			string += toTypeScript(child);

	if (string.includes("ISO_Date") && !string.includes("class ISO_Date"))
		string += Deno.readTextFileSync('../lib/classes.ts');
	return string;
}