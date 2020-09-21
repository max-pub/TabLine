export default function stringify(item) {
	let string = '';
	if (item.$level >= 0)
		string += Array(item.$level + 1).fill('').join('\t') + item.$key + '\t' + item.$values.join('\t') + '\n';
	for (let child of item.$children ?? [])
		string += stringify(child);
	return string;
}

