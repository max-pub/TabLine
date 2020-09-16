

export function parse(text) {
	let root = { $level: -1, $children: [] };
	let last = root;
	for (let line of text.split('\n').filter(x => x.trim())) {
		line = line.split('\t').map(x => x.trim())
		let [$key, ...$values] = line.filter(x => x)
		let $level = line.indexOf($key);
		// console.log('line', $level, last.$level, $key, $values, line);
		let item = { $level, $key, $values, $children: [] }
		while ($level < last.$level + 1) {
			// console.log("GO UP")
			last = last.$parent;
		}
		// console.log('\tlast', $level, last.$level, last);
		if ($level == last.$level + 1) {
			if (!last[$key]) last[$key] = [];
			last[$key].push(item)
			last.$children.push(item);
			item.$parent = last;
			last = item;
		}
	}
	// console.log(root);
	// window.tal = root;
	return root;
}


export function parseDefinition(item) {
	if (typeof item == 'string') item = parse(item)
	console.log('item', item.$key)
	// let item = object;
	// for (let key in object) {
	// let item = object[key];
	// console.log('item',item)
	if (item.$values) {
		item.$cardinality = item.$values[0]//.split(" ")
		item.$type = item.$values[1]
		item.$constraint = item.$values[2]
	}
	for (let child of item.$children ?? [])
		parseDefinition(child)
	// if (key[0] != '$')
	// 	tabLine.parseDefinition(item);
	// }
	return item;
}



export function stringify(item) {
	let string = '';
	if (item.$level >= 0)
		string += Array(item.$level + 1).fill('').join('\t') + item.$key + '\t' + item.$values.join('\t') + '\n';
	for (let child of item.$children ?? [])
		string += stringify(child);
	return string;
}

import typeOf from '../type.js';

export function toHTML(item) {
	let wrap = (string, tag, clazz = '') => `<${tag} class='${clazz ?? ''}'>${string ?? ''}</${tag}>`;
	let string = '';
	if (item.$level >= 0) {
		string += Array(item.$level + 1).fill('').join('\t') + wrap(item.$key, 'key') + '\t'
		if (item.$cardinality)
			string += wrap(item.$cardinality, 'cardinality') + '\t' + wrap(item.$type, 'type', item.$type) + '\t' + wrap(item.$constraint, 'constraint') + '\t' + '\n';
		else
			string += item.$values.map(x => wrap(x, 'value')).join('\t') + '\n';
	}
	for (let child of item.$children ?? [])
		string += toHTML(child);
	return string;

}
function removeCycles(item) {
	let out = { $children: [] };
	if (item.$level >= 0) {
		let { $key, $values } = item;
		out = { $key, $values, $children: [] };
	}
	for (let child of item.$children ?? [])
		out.$children.push(removeCycles(child))
	return out;
}
export function toJSON(item) {
	return JSON.stringify(removeCycles(item), null, '\t')
}


const types = {
	int: 'number',
	float: 'number',
	string: 'string',
	date: 'ISO_Date',
}
const classes = {}

function path(item) {
	let p = [item.$key];
	while (item.$level > 0) {
		item = item.$parent
		p.unshift(item.$key)
		console.log(item.$level, item.$key)
	}
	return p
}

function type(item) {
	if (['date', 'time', 'datetime', 'string', 'int'].includes(item.$type?.toLowerCase()))
		return item.$type
	else return path(item).join('_');
}
export function toTypeScript(item) {
	let string = '';
	if (item.$level >= 0) {
		switch (item.$type) {
			case 'enum':
				string += `enum ${path(item).join('_')} {\n \t${item.$constraint.split(' ').map(x => `${x.replace('/', '_')}='${x}'`).join(', \n\t')} \n}\n`;
				break;
			case 'string':
				string += ``;
				break;
			default:
				string += `class ${path(item).join('_')} {\n`
				if (item.$type)
					string += `\t#value: ${type(item)}\n`
				for (let child of item.$children ?? [])
					string += `\t#${child.$key}: ${type(child)}\n`;
				string += `}\n`;
				break;
		}
		if (item.$level == 0) string = 'export ' + string;
	}
	for (let child of item.$children ?? [])
		string += toTypeScript(child);
	return string;
}

export default { parse, parseDefinition, stringify, toHTML, toJSON, toTypeScript };



// toJSON: function (object) {

// },
// toXML: function (object) {

// },

// toHTML2: str => {
// 	let html = '';
// 	for (let line of str.split('\n')) {
// 		let i = 0;
// 		for (let item of line.split('\t')) {
// 			if (item) {
// 				if (i) html += `<value class='${typeOf(item).name}'>${item}</value>`;
// 				else html += `<key>${item}</key>`;
// 				i++;
// 			}
// 			html += '\t';
// 		}
// 		html += '\n';
// 	}
// 	console.log('html', html);
// 	return html;
// }

