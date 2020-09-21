console.log('tab-line', import.meta.url);


//[ HTML
const HTML = document.createElement('template');
HTML.innerHTML = `<main></main>`;
// console.log("HTML", HTML);
//] HTML





//[ CSS
let STYLE = document.createElement('style');
STYLE.appendChild(document.createTextNode(`/* @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300&display=swap'); */
	/* @import url('https://max.pub/css/quicksand.css');
	@import url('https://max.pub/css/inconsolata.css'); */

	:host {
		display: inline-block;
		background: #333;
		tab-size: 4;
		-moz-tab-size: 4;
		font-size: 14px;
		white-space: pre;
		color: white;

		font-family: var(--font, "Lucida Console", Monaco, monospace);
		font-weight: 100;
		/* padding: .3rem; */
	}

	table {
		width: 100%
	}

	line {
		display: block;
	}

	[level='0'] {
		/* border-top: 1px solid red; */
	}

	[level='1'] td:first-child {
		padding-left: 2rem;
	}

	[level='2'] td:first-child {
		padding-left: 4rem;
	}

	[level='3'] td:first-child {
		padding-left: 6rem;
	}

	* {
		/* font-family: Inconsolata; */
		font-weight: 100;
		font-size: 1.1rem;
	}

	table {
		border-collapse: collapse;
	}

	tr:nth-child(even) {
		background: #393939;
	}

	:host(:not(.definition)) .type {
		display: none;
	}

	/* iframe {
		width: 100%;
		height: 100%;
		border: none;
	} */


	/* body {
		tab-size: 4;
		-moz-tab-size: 4;
		font-size: 14px;
		white-space: pre;
		color: white;
		font-family: monospace;
	} */

	key {
		color: #ddd;
		font-weight: 300;
	}

	.value {
		color: #ffa;
	}

	.cardinality {
		color: #faa;
		padding-left: 3rem;
	}

	.type {
		color: #aaf;
		padding-left: 3rem;
	}

	.constraint {
		color: #afa;
		padding-left: 3rem;
	}



	.value,
	.type {
		color: gray;
		padding-left: 3rem;
	}


	.string {
		color: gold;
	}

	.letters {
		color: goldenrod;
	}



	.date,
	.time,
	.datetime {
		color: magenta;
	}

	.url,
	.email,
	.phone {
		color: pink;
	}

	.email {
		color: papayawhip;
	}


	.bool.false {
		color: #f44;
	}

	.bool.true {
		color: #4f4;
	}



	.int {
		color: aqua;
	}

	.real {
		color: aquamarine;
	}



	.term {
		color: pink
	}

	.open {
		color: #afa;
	}

	.close {
		color: #faa;
	}

	.validation{color: #f55; font-weight: bold;}`));
//] CSS





// import tabLine from '../../js/base.js';
	import parse from '../../js/parse.js';
	import html from '../../js/html.js';
	import validate from '../../js/validate.js';


class WebTag extends HTMLElement {

	constructor() {
		super();
		// console.log('constructor', this.innerHTML);
		this.attachShadow({ mode: 'open', delegatesFocus: true });
		this.shadowRoot.appendChild(STYLE.cloneNode(true)); //: CSS
		this.$HTM = document.createElement('htm')
		this.shadowRoot.appendChild(this.$HTM)
		this.$viewUpdateCount = 0;


	}


	async connectedCallback() {

		this.$applyHTML(); //: HTML

		this.$attachMutationObservers();
		this.$attachEventListeners();




		this.$onReady(); //: onReady
	}


	$attachMutationObservers() {
		//[XSLT
		this.modelObserver = new MutationObserver(events => {
			// console.log('model change', events, events[0].type, events[0].target, events[0].target == this)
			if ((events[0].type == 'attributes') && (events[0].target == this)) {
				
			} else {
				this.$onModelChange(events); //: $onModelChange

			}

		}).observe(this, { attributes: true, characterData: true, attributeOldValue: true, childList: true, subtree: true });
		//] XSLT

		

	}
	// window.addEventListener('load', () => this.applyXSLT());

	//[x  on-tap  on-key  $onSlotChange
	$attachEventListeners() {
		let action = (event, key) => {
			try {
				let target = event.composedPath()[0];
				// let target = event.target;
				let action = target.closest(`[${key}]`);
				// console.log('EEE', key, event.composedPath(), target, action, 'called by', this, event)
				// console.log('PATH', event.composedPath().map(x => this.$1(x)))
				this[action.getAttribute(key)](action, event, target)
			}
			catch  { }
		}








	}
	//]  on-tap  on-key  $onSlotChange


	//[ HTML
	$applyHTML() {
		// this.shadowRoot.innerHTML = `<style>${STYLE.textContent}</style>` + new XMLSerializer().serializeToString(HTML);
		this.$view = HTML.content.cloneNode(true)
		// 	this.$clearView();
		// this.shadowRoot.appendChild(STYLE.cloneNode(true));
		// this.shadowRoot.appendChild(HTML.content.cloneNode(true));
		// this.shadowRoot.insertAdjacentElement('afterbegin',STYLE);
	}
	//] HTML



	// $clearView() {
	// 	this.$clear(this.shadowRoot);
	// }
	$clear(R) {
		// https://jsperf.com/innerhtml-vs-removechild/15  >> 3 times faster
		while (R.lastChild)
			R.removeChild(R.lastChild);
	}


	// set $style(HTML) {
	// 	this.shadowRoot.innerHTML = HTML;
	// }
	get $view() {
		return this.$HTM;
		// return this.shadowRoot.lastChild;
	}
	set $view(HTML) {
		this.$clear(this.$view);
		this.$view.appendChild(HTML);
	}

	


	// 	let treeWalker = document.createTreeWalker(temp1, NodeFilter.SHOW_ELEMENT);
	// let node = null;
	// let list = [];
	// while (node = treeWalker.nextNode()) {
	// 	list.push(currentNode)
	// }








	$q1(q) { return this.shadowRoot.querySelector(q) } //: viewQS1



	


	



	


	//--------------------------------------------
	//--------------------------------------------

	
		$onReady() {
			this.show()
		}
		$onModelChange() {
			this.show()
		}
		async show() {
			console.log('model change', this.textContent)
			try {
				let type = '';
				if (this.classList.contains('definition')) type = 'definition'
				if (this.classList.contains('transformation')) type = 'transformation'
				let data = parse(this.textContent, type);
				let definition = this.getAttribute('definition');
				if (definition) {
					definition = await fetch(definition).then(x => x.text());
					console.log("VALIDATIOON",definition)
					definition = parse(definition, 'definition')
					validate(data, definition);
				}
				// if (this.classList.contains('definition'))
				// 	data = tabLine.parseDefinition(data)

				// console.log('data', data);
				// console.log('html', html(data))
				this.$q1('main').innerHTML = '<table>' + html(data) + '</table>';
				// console.log('html', tabLine.toHTML(data))
				// console.log('json',tabLine.toJSON(data))
				// console.log('json', tabLine.toTypeScript(data))
				// window.tal = tabLine.parse(this.textContent);
				// window.tas = tabLine.stringify(window.tal);
				// console.log(tal, tas);
			} catch (e) { console.log('error', e) }
		}


};
// console.log(WebTag)
window.customElements.define('tab-line', WebTag)


