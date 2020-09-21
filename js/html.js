import typeOf from './types.js';

function maxSiblingWidth(item, key) {
	if (!item.$parent) return 0;
	return Math.max(...item.$parent.$children.map(x => x[key]?.length));
}
function padding(item, key) {
	let maxWidth = maxSiblingWidth(item, key);
	let width = Math.ceil(maxWidth / 4) * 4;
	return item[key]?.padEnd(width, ' ') ?? '';
}
export default function toHTML(item) {
	let string = '';
	if (item.$level >= 0) {
		// console.log('max-width',padding(item,'$key'))
		string += `<tr level="${item.$level}"><td class='key'>${item.$key}</td>`;
		if (item.$cardinality) {
			string += `<td class='cardinality'>${item.$cardinality}</td>\n`
			string += `<td class='type ${item.$type ?? ''}'>${item.$type ?? ''}</td>\n`
			string += `<td class='constraint'>${item.$constraint ?? ''}</td>\n`
		} else if (item.$open) {
			string += `<td class='open'>${item.$open?.replace(/</g, '&lt;') ?? ''}</td>\n`
			string += `<td class='close'>${item.$close?.replace(/</g, '&lt;') ?? ''}</td>\n`
		} else if (item.$validation) {
			string += `<td class='values'>` + (item.$values ?? ['1']).map(x => `<span class='value ${typeOf(x)} ${typeOf(x) == 'bool' ? x : ''}' title='${typeOf(x)}'>${x}</span>`).join('') + '</td>\n';
			string += `<td class='validation'>${item.$validation.cardinality ?? ''}</td>\n`
			string += `<td class='validation'>${item.$validation.type ?? ''}</td>\n`
		} else {
			string += `<td class='values'>` + (item.$values ?? ['1']).map(x => `<span class='value ${typeOf(x)} ${typeOf(x) == 'bool' ? x : ''}' title='${typeOf(x)}'>${x}</span>`).join('') + '</td>\n';
			string += `<td class='type'>${typeOf(item.$values?.[0])}</td>`
		}
		+ '</tr>\n'
	}
	for (let child of item.$children ?? [])
		string += toHTML(child);
	return string;

}

export function toHTML2(item) {
	let wrap = (string, tag, clazz = '') => `<${tag} class='${clazz ?? ''}'>${string ?? ''}</${tag}>`;
	let string = '';
	if (item.$level >= 0) {
		console.log('max-width', padding(item, '$key'))
		string += `<line level="${item.$level}">` + Array(item.$level + 1).fill('').join('\t') + wrap(padding(item, '$key'), 'key') + '\t';
		if (item.$cardinality)
			string += wrap(padding(item, '$cardinality'), 'cardinality') + '\t' + wrap(padding(item, '$type'), 'type', item.$type) + '\t' + wrap(item.$constraint, 'constraint');//+ '\n';
		else
			string += item.$values.map(x => wrap(x, 'value')).join('\t') + '\n';
		+ '</line>'
	}
	for (let child of item.$children ?? [])
		string += toHTML(child);
	return string;

}