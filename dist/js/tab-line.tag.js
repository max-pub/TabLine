console.log('tab-line', import.meta.url);
function NODE(name, attributes = {}, children = []) {
	let node = document.createElement(name);
	for (let key in attributes)
		node.setAttribute(key, attributes[key]);
	for (let child of children)
		node.appendChild(typeof child == 'string' ? document.createTextNode(child) : child);
	return node;
}
class XML {
	static parse(string, type = 'xml') {
		return new DOMParser().parseFromString(string.replace(/xmlns=".*?"/g, ''), 'text/' + type)
	}
	static stringify(DOM) {
		return new XMLSerializer().serializeToString(DOM).replace(/xmlns=".*?"/g, '')
	}
}
XMLDocument.prototype.stringify = XML.stringify
Element.prototype.stringify = XML.stringify
const HTML = document.createElement('template');
HTML.innerHTML = `<main></main>`;
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
	.key {
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
function QQ(query, i) {
	let result = Array.from(this.querySelectorAll(query));
	return i ? result?.[i - 1] : result;
}
Element.prototype.Q = QQ
ShadowRoot.prototype.Q = QQ
DocumentFragment.prototype.Q = QQ
class WebTag extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open', delegatesFocus: true });
		this.shadowRoot.appendChild(STYLE.cloneNode(true)); //: CSS
		this.$HTM = document.createElement('htm')
		this.shadowRoot.appendChild(this.$HTM)
	}
	async connectedCallback() {
		this.$applyHTML(); //: HTML
		this.$attachMutationObservers();
		this.$attachEventListeners();
		this.$onReady(); //: onReady
	}
	$attachMutationObservers() {
		this.modelObserver = new MutationObserver(events => {
			if ((events[0].type == 'attributes') && (events[0].target == this)) {
			} else {
			}
		}).observe(this, { attributes: true, characterData: true, attributeOldValue: true, childList: true, subtree: true });
	}
	$attachEventListeners() {
		let action = (event, key) => {
			try {
				let target = event.composedPath()[0];
				let action = target.closest(`[${key}]`);
				this[action.getAttribute(key)](action, event, target)
			}
			catch { }
		}
	}
	$applyHTML() {
		this.$view = HTML.content.cloneNode(true)
	}
	$clear(R) {
		while (R.lastChild)
			R.removeChild(R.lastChild);
	}
	get $view() {
		return this.$HTM;
	}
	set $view(HTML) {
		this.$clear(this.$view);
		if (typeof HTML == 'string')
			HTML = new DOMParser().parseFromString(HTML, 'text/html').firstChild
		this.$view.appendChild(HTML);
	}
};
	import {parse1 as parse} from '../../js/parse.js';
	import html from '../../js/html.js';
	import validate from '../../js/validate.js';
	class tab_line extends WebTag {
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
				let data = parse(this.textContent, type).root;
				let definition = this.getAttribute('definition');
				if (definition) {
					definition = await fetch(definition).then(x => x.text());
					console.log("VALIDATIOON",definition)
					definition = parse(definition, 'definition')
					validate(data, definition);
				}
				this.$view.Q('main',1).innerHTML = '<table>' + html(data) + '</table>';
			} catch (e) { console.log('error', e) }
		}
	}
window.customElements.define('tab-line', tab_line)