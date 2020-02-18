import { render } from './render.js';
import { resize } from './resize.js';
import { selectBlock } from './select-block.js';

window.charpg = (chunk = []) => {
	const pre = document.createElement('pre');
	let mask = render(pre, chunk);

	document.body.appendChild(pre);
	window.addEventListener('resize', () => resize(pre));
	resize(pre);
	
	pre.addEventListener('click', ({ offsetX, offsetY }) => {
		const { clientWidth, clientHeight } = pre;
		const xPercent = offsetX / clientWidth;
		const yPercent = offsetY / clientHeight;
		const block = selectBlock(chunk, mask, xPercent, yPercent);
	
		if (!block) {
			return;
		}
	
		const [x, z, y] = block;
		const line = chunk[y][z];
	
		chunk[y][z] = `${line.slice(0, x)} ${line.slice(x + 1)}`;
		mask = render(pre, chunk);
	});
};

const style = document.createElement('style');
document.head.appendChild(style);

style.innerHTML = `html, body { width: 100%; height: 100%; }
* { margin: 0; padding: 0; box-sizing: border-box; font-family: monospace; }
li + li { margin-top: 15px; }
body > pre { position: absolute; left: 50%; top: 50%; }
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
