import { inflateChunk } from './inflate-chunk.js';
import { render } from './render.js';
import { resize } from './resize.js';
import { selectBlock } from './select-block.js';
import { rotateChunk } from './rotate-chunk.js';

function modifyLine (line, x, block) {
	return `${line.slice(0, x)}${block || ' '}${line.slice(x + 1)}`;
}

export default function charpg (chunk, length = 9) {
	chunk = inflateChunk([
		[
			'b b b b b',
			'         ',
			'         ',
			'b b   b b',
			'         ',
			'         ',
			'bbb   bbb',
			'b b   b b',
			'bbb   bbb'
		],
		[
			'b b b b b',
			'         ',
			'         ',
			'b b   b b',
			'         ',
			'         ',
			'         ',
			'         ',
			'         '
		],
		[
			'b b b b b',
			'         ',
			'         ',
			'b b   b b',
			'         ',
			'         ',
			'         ',
			'         ',
			'         '
		],
		[
			'b b b b b',
			'         ',
			'         ',
			'b b   b b',
			'         ',
			'         ',
			'         ',
			'         ',
			'         '
		],
		[
			'bbbbbbbbb',
			'bbbbbbbbb',
			'bbbbbbbbb',
			'bbbbbbbbb',
			'         ',
			'         ',
			'         ',
			'         ',
			'         '
		],
		[
			'b b b b b',
			'         ',
			'         ',
			'b b b b b',
			'         ',
			'         ',
			'         ',
			'         ',
			'         '
		],
		[
			'         ',
			'         ',
			'         ',
			'         ',
			'         ',
			'         ',
			'         ',
			'         ',
			'         '
		],
		[
			'         ',
			'         ',
			'         ',
			'         ',
			'         ',
			'         ',
			'         ',
			'         ',
			'         '
		],
		[
			'         ',
			'         ',
			'         ',
			'         ',
			'         ',
			'         ',
			'         ',
			'         ',
			'         '
		]
	], length);

	const previewChunk = inflateChunk([], length);
	const pre = document.createElement('pre');
	const previewPre = document.createElement('pre');
	let mask = render(pre, chunk);
	render(previewPre, previewChunk, true);
	let xPercent;
	let yPercent;
	let previousId;

	document.body.appendChild(pre);
	document.body.appendChild(previewPre);
	previewPre.style.opacity = 0.5;
	window.addEventListener('resize', () => resize(pre, previewPre));
	resize(pre, previewPre);

	function modifyChunk (block, onlyPreview) {
		event.preventDefault();

		if (xPercent === undefined || yPercent === undefined) {
			return;
		}

		const selection = selectBlock(mask, yPercent, xPercent);
	
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
		}		

		const id = [x, z, y].join(':');

		if (onlyPreview && id === previousId || x >= length || z >= length || y >= length || y < 0) {
			return;
		}

		if (previousId) {
			const [previousX, previousZ, previousY] = previousId.split(':').map(Number);

			previewChunk[previousY][previousZ] = modifyLine(previewChunk[previousY][previousZ], previousX);
			previewChunk[y][z] = modifyLine(previewChunk[y][z], x, 'd');
		}

		render(previewPre, previewChunk, true);
		previousId = id;
		
		if (!onlyPreview) {
			chunk[y][z] = modifyLine(chunk[y][z], x, block);
			mask = render(pre, chunk);
			modifyChunk('b', true);
		}

		return;
	}

	previewPre.addEventListener('mousemove', ({ offsetX, offsetY }) => {
		const { clientWidth, clientHeight } = pre;

		xPercent = offsetX / clientWidth;
		yPercent = offsetY / clientHeight;

		modifyChunk('b', true);
	});
	
	previewPre.addEventListener('click', () => modifyChunk('b'));
	previewPre.addEventListener('contextmenu', () => modifyChunk());
	
	const buttons = document.createElement('div');
	const counterButton = document.createElement('button');
	const clearButton = document.createElement('button');
	const clockwiseButton = document.createElement('button');

	Object.assign(counterButton, { innerText: 'Rotate CCW', type: 'button' });
	Object.assign(clearButton, { innerText: 'Clear All', type: 'button' });
	Object.assign(clockwiseButton, { innerText: 'Rotate CW', type: 'button' });

	counterButton.addEventListener('click', () => {
		chunk = rotateChunk(chunk);
		mask = render(pre, chunk);
	});
	
	clearButton.addEventListener('click', () => {
		chunk = inflateChunk([], length);
		mask = render(pre, chunk);
	});
	
	clockwiseButton.addEventListener('click', () => {
		chunk = rotateChunk(chunk, true);
		mask = render(pre, chunk);
	});

	buttons.appendChild(counterButton);
	buttons.appendChild(clearButton);
	buttons.appendChild(clockwiseButton);
	document.body.appendChild(buttons);

	const instructions = document.createElement('p');
	
	instructions.innerText = 'Click to place block. Right click to remove block.';
	document.body.appendChild(instructions);
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
}
div { text-align: center; }
button {
	width: 33.333vh;
	height: 8vh;
	border: 1px solid black;
	border-radius: 0.5vh;
	margin: 0.5vh;
	font-size: 4vh;
	background: white;
	cursor: pointer;
}
button:hover { background: lightgray; }
p {
	position: absolute;
	bottom: 0;
	width: 100%;
	padding: 1vh;
	font-size: 3.5vh;
	text-align: center
}`;

charpg();
