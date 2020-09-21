import taliParser from './parse.js';
import parse from './parse.js';
import validate from './validate.js';

// console.log(import.meta)
async function load(file) {
	let url = new URL(file, import.meta.url);
	if (url.protocol == 'file:')
		return Deno.readTextFileSync(url);
	else
		return await fetch(url).then(x => x.text());
}

let data = await load('../data/contact.tali')
console.log('\n\n\ndata', data);
data = parse(data);
let schema = await load('../data/contact.def.tali')
console.log('\n\n\ndef', schema);
schema = parse(schema,'definition')

console.log('\n\n\n')
validate(data, schema);

console.log(data);