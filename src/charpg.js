import { setup } from './setup.js';
import { io } from './io.js';
import { inflate } from './inflate.js';
import { render } from './render.js';
import { resize } from './resize.js';
import { modify } from './modify.js';
import { select } from './select.js';
import { rotate } from './rotate.js';

export default function charpg () {
	const length = 9;
	const previewChunk = inflate([], length);
	const pre = document.createElement('pre');
	const previewPre = document.createElement('pre');
	let chunkCoordinates = [0, 0, 0];
	let rotation = 0;
	let xPercent;
	let yPercent;
	let previousId;
	let chunk;
	let mask;

	const {
		counterButton,
		clockwiseButton,
		loadLeftButton,
		loadRightButton,
		saveButton,
		typeSelect
	} = setup();
	
	let selectedType = typeSelect.value;

	function load (change) {
		let [x, z, y] = chunkCoordinates;

		if (change) {
			switch (rotation) {
				case 0:
					x += change;
					break;
				case 1:
					z += change;
					break;
				case 2:
					x += -change;
					break;
				case 3:
					z += -change;
					break;
			}
		}

		return io(x, z, y).then((adjacentChunk = []) => {
			chunkCoordinates = [x, z, y];

			switch (rotation) {
				case 0:
					chunk = adjacentChunk;
					break;
				case 1:
					chunk = rotate(adjacentChunk);
					break;
				case 2:
					chunk = rotate(rotate(adjacentChunk));
					break;
				case 3:
					chunk = rotate(adjacentChunk, true);
					break;
			}

			mask = render(chunk, pre);
			render(inflate([]), previewPre, true);
		});
	}

	document.body.appendChild(pre);
	document.body.appendChild(previewPre);
	previewPre.style.opacity = 0.5;
	window.addEventListener('resize', () => resize(pre, previewPre));

	function modifyChunk (block, onlyPreview) {
		if (xPercent === undefined || yPercent === undefined) {
			return;
		}

		const selection = select(mask, yPercent, xPercent);
		
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

		const coordinates = [x, z, y];
		const id = coordinates.join(':');

		if (onlyPreview && id === previousId
				|| x >= length || z >= length || y >= length || y < 0) {
			return;
		}

		if (previousId) {
			modify(previousId.split(':').map(Number), previewChunk);
			modify(coordinates, previewChunk, selectedType);
		}

		render(previewChunk, previewPre, true);
		previousId = id;
		
		if (!onlyPreview) {
			modify(coordinates, chunk, block);
			mask = render(chunk, pre);
			modifyChunk(selectedType, true);
		}

		return;
	}

	function rotateChunk (change) {
		chunk = rotate(chunk, change < 0);
		mask = render(chunk, pre);
		rotation = (rotation + change + 4) % 4;
	}

	previewPre.addEventListener('mousemove', ({ offsetX, offsetY }) => {
		const { clientWidth, clientHeight } = pre;

		xPercent = offsetX / clientWidth;
		yPercent = offsetY / clientHeight;

		modifyChunk(selectedType, true);
	});
	
	previewPre.addEventListener('click', event => {
		event.preventDefault();
		modifyChunk(selectedType);
	});

	previewPre.addEventListener('contextmenu', event => {
		event.preventDefault();
		modifyChunk();
	});

	counterButton.addEventListener('click', () => rotateChunk(1));
	clockwiseButton.addEventListener('click', () => rotateChunk(-1));
	loadLeftButton.addEventListener('click', () => load(-1));
	loadRightButton.addEventListener('click', () => load(1));

	typeSelect.addEventListener('change', () => {
		selectedType = typeSelect.value;
	});

	saveButton.addEventListener('click', () => {
		let correctedChunk;

		switch (rotation) {
			case 0:
				correctedChunk = chunk;
				break;
			case 1:
				correctedChunk = rotate(chunk, true);
				break;
			case 2:
				correctedChunk = rotate(rotate(chunk, true), true);
				break;
			case 3:
				correctedChunk = rotate(chunk);
				break;
		}

		io(...chunkCoordinates, correctedChunk)
	});

	load().then(() => resize(pre, previewPre));
};

charpg();
