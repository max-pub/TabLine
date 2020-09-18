

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
		// console.log(item.$level, item.$key)
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

