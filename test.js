import parse from './js/parse.js';

let text = Deno.readTextFileSync('./data/contact.tali');

let data = parse(text);

console.log(JSON.stringify(data.root,null,4))