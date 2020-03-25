import { setup } from './setup.js';
import { io } from './io.js';
import { inflate } from './inflate.js';
import { render } from './render.js';
import { resize } from './resize.js';
import { modify } from './modify.js';
import { select } from './select.js';
import { rotate } from './rotate.js';
import { locateOffset } from './locate-offset.js';

export default function charpg () {
	const length = 9;
	const previewChunk = inflate([], length);
	let chunkCoordinates = [0, 0, 0];
	let rotation = 0;
	let isRotated = false;
	let xPercent;
	let yPercent;
	let previousId;
	let chunk;
	let mask;

	const divs = [
		'',
		'mask',
		'before',
		'after',
		'behind before',
		'behind',
		'behind after'
	].map(modifier => {
		const div = document.createElement('div');
	
		div.className = `frame ${modifier}`;
		document.body.appendChild(div);
	
		return div;
	});

	const [div, previewDiv, ...adjacents] = divs;

	const {
		counterButton,
		clockwiseButton,
		loadLeftButton,
		loadRightButton,
		saveButton,
		typeSelect
	} = setup();
	
	let selectedType = typeSelect.value;

	function locateCoordinates (...changes) {
		let [x, z, y] = chunkCoordinates;

		changes.forEach((change, i) => {
			if (change === undefined) {
				return;
			}

			switch (rotation + i) {
				case 0:
				case 4:
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
		});

		return [x, z, y];
	}

	function loadAndRotate (coordinates) {
		return io(...coordinates).then((chunk = []) => {
			switch (rotation) {
				case 1: return rotate(chunk);
				case 2: return rotate(rotate(chunk));
				case 3: return rotate(chunk, true);
			}

			return chunk;
		});
	}

	function loadAdjacents () {
		return Promise.all(
			adjacents.map(div => {
				const [x, z] = locateOffset(div);
				const coordinates = locateCoordinates(x, z);

				return loadAndRotate(coordinates).then(chunk => {
					render(chunk, div, true, isRotated);
				});
			})
		);
	}

	function save () {
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
	}

	function load (x, z) {
		const coordinates = locateCoordinates(x, z);

		return loadAndRotate(coordinates).then((centerChunk = []) => {
			chunkCoordinates = coordinates;
			chunk = centerChunk;
			mask = render(chunk, div, false, isRotated);
			render(inflate([]), previewDiv, true, isRotated);

			return loadAdjacents();
		});
	}

	window.addEventListener('resize', () => resize(isRotated, ...divs));

	function modifyChunk (block, onlyPreview) {
		if (xPercent === undefined || yPercent === undefined) {
			return;
		}

		const selection = select(mask, yPercent, xPercent, isRotated);
		
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
					x += isRotated ? length : 1;
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

		render(previewChunk, previewDiv, true, isRotated);
		previousId = id;
		
		if (!onlyPreview) {
			modify(coordinates, chunk, block);
			mask = render(chunk, div, false, isRotated);
			modifyChunk(selectedType, true);
		}

		return;
	}

	function rotateChunk (change) {
		if (change > 0 === isRotated) {
			rotation = (rotation + change + 4) % 4;
			chunk = rotate(chunk, change < 0);
		}

		isRotated = !isRotated;
		mask = render(chunk, div, false, isRotated);
		loadAdjacents();
		resize(isRotated, ...divs);
		document.body.classList[isRotated ? 'add' : 'remove']('flipped');
	}

	previewDiv.addEventListener('mousemove', ({ offsetX, offsetY }) => {
		const { clientWidth, clientHeight } = div;

		xPercent = offsetX / clientWidth;
		yPercent = offsetY / clientHeight;

		modifyChunk(selectedType, true);
	});
	
	previewDiv.addEventListener('click', event => {
		event.preventDefault();
		modifyChunk(selectedType);
	});

	previewDiv.addEventListener('contextmenu', event => {
		event.preventDefault();
		modifyChunk();
	});

	counterButton.addEventListener('click', () => rotateChunk(1));
	clockwiseButton.addEventListener('click', () => rotateChunk(-1));
	loadLeftButton.addEventListener('click', () => load(-1));
	loadRightButton.addEventListener('click', () => load(1));
	saveButton.addEventListener('click', () => save());

	typeSelect.addEventListener('change', () => {
		selectedType = typeSelect.value;
	});

	window.addEventListener('keydown', ({ key, repeat }) => {
		if (repeat) {
			return;
		}

		switch (key) {
			case ' ':
				save();
				break;
			case 'q':
				rotateChunk(1);
				break;
			case 'e':
				rotateChunk(-1);
				break;
			case 'a':
				load(-1)
				break;
			case 'd':
				load(1);
				break;
			case 'w':
				load(0, -1);
				break;
			case 's':
				load(0, 1);
				break;
		}
	});

	load().then(() => resize(isRotated, ...divs));
};

charpg();
