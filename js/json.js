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
