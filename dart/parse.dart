import 'dart:io';
// import 'dart:convert';

void main() {
  print(Directory.current);
  String tmp = File('./data/contact.tali').readAsStringSync();
  // print(tmp);
  var t3 = parse(tmp);
  print('--------------');
  print(t3);
  // print(json.encode(t3));
}

Map parse(String text) {
  var root = {'_level': -1, '_children': []};
  var last = root;
  for (var line in text.split('\n').where((x) => x.trim() != '')) {
    // print(line);
    var cells = line.split('\t').map((x) => x.trim());
    // print(cells);
    var nonNull = cells.where((x) => x != '').toList();
    var _key = nonNull[0];
    var _values = nonNull.sublist(1);
    var _level = cells.toList().indexOf(_key);
    var item = {
      '_level': _level,
      '_key': _key,
      '_values': _values,
      '_children': []
    };
    print(item);
    while (_level < (last['_level'] as int) + 1) {
      last = last['_parent'];
    }
    if (_level == (last['_level'] as int) + 1) {
      if (last[_key] == null) last[_key] = [];
      (last[_key] as List).add(item);
      (last['_children'] as List).add(item);
      item['_parent'] = last;
      last = item;
    }
  }
  // print(root['_level']);
  return root;
}

// export default function parse(text, type) {
// 	let root = { $level: -1, $children: [] };
// 	let last = root;
// 	for (let line of text.split('\n').filter(x => x.trim())) {
// 		line = line.split('\t').map(x => x.trim())
// 		let [$key, ...$values] = line.filter(x => x)

// 		let $level = line.indexOf($key);
// 		// console.log('line', $level, last.$level, $key, $values, line);
// 		let item = { $level, $key, $values, $children: [] }

// 		if (type == 'definition' && $values) {
// 			item.$cardinality = $values[0]//.split(" ")
// 			item.$type = $values[1]
// 			item.$constraints = $values.slice(2)
// 		}
// 		if (type == 'transformation' && $values) {
// 			item.$open = $values[0]//.split(" ")
// 			item.$close = $values[1]
// 		}

// 		while ($level < last.$level + 1) {
// 			// console.log("GO UP")
// 			last = last.$parent;
// 		}
// 		// console.log('\tlast', $level, last.$level, last);
// 		if ($level == last.$level + 1) {
// 			if (!last[$key]) last[$key] = [];
// 			last[$key].push(item)
// 			last.$children.push(item);
// 			item.$parent = last;
// 			last = item;
// 		}
// 	}
// 	// console.log(root);
// 	// window.tal = root;
// 	return root;
// }
