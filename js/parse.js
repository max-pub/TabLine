

export function parse1(text, type) {
	let root = { $level: -1, $children: [] };
	let last = root;
	for (let line of text.split('\n').filter(x => x.trim())) {
		line = line.split('\t').map(x => x.trim())
		let [$key, ...$values] = line.filter(x => x)

		let $level = line.indexOf($key);
		// console.log('line', $level, last.$level, $key, $values, line);
		let item = { $level, $key, $values, $children: [] }

		if (type == 'definition' && $values) {
			item.$cardinality = $values[0]//.split(" ")
			item.$type = $values[1]
			item.$constraints = $values.slice(2)
		}
		if (type == 'transformation' && $values) {
			item.$open = $values[0]//.split(" ")
			item.$close = $values[1]
		}

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





export function toJSON2(text, type) {
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
			item.$parent = last;
			last = item;
		}
	}
	// console.log(root);
	// window.tal = root;
	return root;
}


export function toJSON(lines, tabs = 0, output = {}) {
	if (!Array.isArray(lines)) lines = lines.split('\n').filter(x => x.trim());
	// let output = {};
	for (let line of lines) {
		line = line.split('\t').map(x => x.trim())
		let [key, ...values] = line.filter(x => x)
		let lineTabs = line.indexOf(key);
		console.log(lineTabs, key);
		if (lineTabs > tabs)

			output[key] = [...output[key] ?? [], ...values]

	}
	console.log('toJSON', output);
	return output;
}

export class Parser {
	// data = {};
	stack = [{}];
	lineCounter = 0;
	get root() { return this.stack[0]; }
	get last() { return this.stack.slice(-1)[0]; }
	set last(v) { this.stack.pop(); this.stack.push(v); }
	constructor(text) {
		this.block(text)
	}
	block(text) {
		text.split('\n').filter(line => line.trim()).map(line => this.line(line));
		return this;
	}
	line(line) {
		this.lineCounter++;
		// if (this.lineCounter > 5) return;
		line = line.split('\t').map(x => x.trim())
		let [key, ...values] = line.filter(x => x)
		let level = line.indexOf(key);
		console.log(level, key, values); // , 'stack', this.stack.length, this.stack
		// console.log(JSON.stringify(this.stack,null,4))

		while (level < this.stack.length - 1) {
			console.log("GO UP")
			this.stack.pop();
		}

		if (values.length < 1) {
			let data = {};
			this.last[key] = [...this.last[key] ?? [], data];
			this.stack.push(data)
		}
		else
			this.last[key] = [...this.last[key] ?? [], ...values];

		return this;
	}
}
export default function (text) { return new Parser(text); }





// line = line.split('\t').map(x => x.trim())
// let [$key, ...$values] = line.filter(x => x)

// let $level = line.indexOf($key);
// // console.log('line', $level, last.$level, $key, $values, line);
// let item = { $level, $key, $values, $children: [] }


// while ($level < last.$level + 1) {
// 	// console.log("GO UP")
// 	last = last.$parent;
// }
// // console.log('\tlast', $level, last.$level, last);
// if ($level == last.$level + 1) {
// 	if (!last[$key]) last[$key] = [];
// 	last[$key].push(item)
// 	last.$children.push(item);
// 	item.$parent = last;
// 	last = item;
// }
// }
// // console.log(root);
// // window.tal = root;
// return root;

// // export function parseDefinition(item) {
// // 	if (typeof item == 'string') item = parse(item)
// // 	// console.log('item', item.$key)
// // 	// let item = object;
// // 	// for (let key in object) {
// // 	// let item = object[key];
// // 	// console.log('item',item)
// // 	if (item.$values) {
// // 		item.$cardinality = item.$values[0]//.split(" ")
// // 		item.$type = item.$values[1]
// // 		item.$constraint = item.$values[2]
// // 	}
// // 	for (let child of item.$children ?? [])
// // 		parseDefinition(child)
// // 	// if (key[0] != '$')
// // 	// 	tabLine.parseDefinition(item);
// // 	// }
// // 	return item;
// // }