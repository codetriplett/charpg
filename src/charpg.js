import { inflateChunk } from './inflate-chunk.js';
import { render } from './render.js';
import { resize } from './resize.js';
import { selectBlock } from './select-block.js';

window.charpg = (chunk) => {
	chunk = inflateChunk(chunk);

	const pre = document.createElement('pre');
	let mask = render(pre, chunk);

	document.body.appendChild(pre);
	window.addEventListener('resize', () => resize(pre));
	resize(pre);

	function modifyChunk (event, block) {
		event.preventDefault();

		const { offsetX, offsetY } = event;
		const { clientWidth, clientHeight } = pre;
		const xPercent = offsetX / clientWidth;
		const yPercent = offsetY / clientHeight;
		const selection = selectBlock(chunk, mask, yPercent, xPercent);
	
		if (!selection) {
			return;
		}
	
		let [x, z, y, offset] = selection;

		if (block) {
			switch (offset) {
				case 729:
					y += 1;
					break;
				case 27:
					z += 1;
					break;
				case 1:
					x += 1;
					break;
			}
		} else if (y < 0) {
			return;
		}

		const line = chunk[y][z];

		chunk[y][z] = `${line.slice(0, x)}${block || ' '}${line.slice(x + 1)}`;
		mask = render(pre, chunk);

		return;
	}
	
	pre.addEventListener('click', event => modifyChunk(event, 'd'));
	pre.addEventListener('contextmenu', event => modifyChunk(event));
};

const style = document.createElement('style');
document.head.appendChild(style);

style.innerHTML = `html, body { width: 100%; height: 100%; }
* { margin: 0; padding: 0; box-sizing: border-box; font-family: monospace; }
li + li { margin-top: 15px; }
body > pre {
	position: absolute;
	left: 50%;
	top: 50%;
	cursor: default;
	user-select: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
}
ul {
	list-style: none;
	display: none;
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	padding: 15px;
	color: lightgreen;
	background-color: rgba(0, 0, 0, 0.75);
	overflow-y: scroll;
}`;
