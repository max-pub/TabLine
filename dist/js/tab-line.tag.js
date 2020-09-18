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

	line {
		display: block;
	}

	[level='0'] {
		/* border-top: 1px solid red; */
	}

	[level='1'] {
		padding-left: 2rem;
	}

	[level='2'] {
		padding-left: 4rem;
	}

	[level='3'] {
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

	index {
		color: gray;
		font-weight: bold;
	}

	.value,
	.type {
		color: gray;
		padding-left: 3rem;
	}

	.string {
		color: gold;
	}

	.date,
	.time,
	.datetime {
		color: magenta;
	}

	.url {
		color: pink;
	}

	.email {
		color: papayawhip;
	}

	.null,
	.undefined {
		color: silver;
	}

	.boolean.false {
		color: #f44;
	}

	.boolean.true {
		color: #4f4;
	}

	.int {
		color: aqua;
	}

	.float {
		color: aquamarine;
	}

	.term {
		color: pink
	}`));
//] CSS





import tabLine from '../../js/base.js';
	import tali2html from '../../js/html.js';

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
		show() {
			console.log('model change', this.textContent)
			try {
				let data = this.classList.contains('definition') ? tabLine.parseDefinition(this.textContent) : tabLine.parse(this.textContent);
				console.log('data', data);
				this.$q1('main').innerHTML = '<table>' + tali2html(data) + '</table>';
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


