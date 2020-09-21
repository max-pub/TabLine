
import type from './types.js';

export default function validate(data, definition) {
	// console.log('validate', data.$key, definition?.$key);
	// check type
	// console.log('type', data.$values, definition?.$type)
	if (definition?.$type) {
		// console.log('val', data.$value)
		// console.log(data.$values.map(val => type(val)), definition.$type)
		if (!data.$validation) data.$validation = {};
		data.$validation.type = ''
		for (let val of data.$values)
			if (type(val) != definition.$type)
				data.$validation.type = '!';
		console.log('    ', data.$validation, data.$values, data.$values.map(val => type(val)), definition.$type)
		// data.$validation = {...$validation}
	}
	let keys = [...new Set([...Object.keys(data).filter(x => x[0] != '$'), ...Object.keys(definition).filter(x => x[0] != '$'),])]
	// console.log(data)
	// console.log(keys)


	// check cardinality
	for (let key of keys) {
		console.log('check', key);
		if (!data[key]) data[key] = [{ $key: key, $values: [] }]
		let dat = data[key];
		let def = definition[key]?.[0];
		let cardinality = ''
		// if (!dat.$validation) dat.$validation = {};
		// check if undefined keys are used
		if (!def)
			cardinality = '!';
		// console.error('ERROR:', key, 'not defined');

		// check if keys are used too little
		if (['1', '+'].includes(def?.$cardinality) && !dat?.length)
			cardinality = '<';
		// console.log('ERROR:', key, 'NOT FOUND in data')

		// check if keys are used too often
		if (['1', '?'].includes(def?.$cardinality) && dat?.length > 1)
			cardinality = '>';
		// console.log('ERROR:', key, 'is used TOO OFTEN')

		for (let d of dat) {
			if (!d.$validation) d.$validation = {}
			d.$validation.cardinality = cardinality;
		}

		console.log('	', cardinality, def?.$cardinality, dat?.length);
		// check type
		if (def)
			for (let x of dat ?? [])
				validate(x, def)

	}

}










		// if(def.$type)
		// 	console.log(type(d))
		// console.log('iterate',dat)

	// for (let child of definition.$children ?? []) {
	// 	console.log('def check', child.$key);

	// 	// check if required keys can be found
	// 	if (['1', '+'].includes(child.$cardinality) && !data[child.$key])
	// 		console.log('ERROR:', child.$key, 'NOT FOUND in data')

	// 	// check if keys are used too often
	// 	if (['1', '?'].includes(child.$cardinality) && data[child.$key].length > 1)
	// 		console.log('ERROR:', child.$key, 'is used TOO OFTEN')
	// }
	// for (let child of Object.keys(data).filter(x => !x.startsWith('$')) ?? []) {
	// 	console.log('data check', child);

	// 	// check if undefined keys are used
	// 	if (!definition[child])
	// 		console.error('ERROR:', child, 'not defined');

	// 	// if(data[child].length>)
	// 	// string += validate(child);
	// }