





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

