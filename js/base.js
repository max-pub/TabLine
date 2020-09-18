

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
    // console.log('item', item.$key)
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

export function validate(item){

}



export function stringify(item) {
    let string = '';
    if (item.$level >= 0)
        string += Array(item.$level + 1).fill('').join('\t') + item.$key + '\t' + item.$values.join('\t') + '\n';
    for (let child of item.$children ?? [])
        string += stringify(child);
    return string;
}


export default { parse, parseDefinition, validate, stringify };