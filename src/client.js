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
	const leftPre = document.createElement('pre');
	const rightPre = document.createElement('pre');
	let chunkCoordinates = [0, 0, 0];
	let rotation = 0;
	let isRotated = false;
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

	function locateCoordinates (change) {
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
		return Promise.all([
			loadAndRotate(locateCoordinates(-1)),
			loadAndRotate(locateCoordinates(1))
		]).then(([leftChunk, rightChunk]) => {
			render(leftChunk, leftPre, true, isRotated);
			render(rightChunk, rightPre, true, isRotated);
		});
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

	function load (change) {
		if (change) {
			save();
		}

		const coordinates = locateCoordinates(change);

		return loadAndRotate(coordinates).then((adjacentChunk = []) => {
			chunkCoordinates = coordinates;
			chunk = adjacentChunk;
			mask = render(chunk, pre, false, isRotated);
			render(inflate([]), previewPre, true, isRotated);

			return loadAdjacents();
		});
	}

	leftPre.style.opacity = 0.5;
	rightPre.style.opacity = 0.5;
	previewPre.style.opacity = 0.5;

	document.body.appendChild(leftPre);
	document.body.appendChild(rightPre);
	document.body.appendChild(pre);
	document.body.appendChild(previewPre);
	window.addEventListener('resize', () => resize(pre, previewPre, leftPre, rightPre));

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

		render(previewChunk, previewPre, true, isRotated);
		previousId = id;
		
		if (!onlyPreview) {
			modify(coordinates, chunk, block);
			mask = render(chunk, pre, false, isRotated);
			modifyChunk(selectedType, true);
		}

		return;
	}

	function rotateChunk (change) {
		rotation = (rotation + change + 4) % 4;
		chunk = rotate(chunk, change < 0);
		mask = render(chunk, pre);

		loadAdjacents();
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
	saveButton.addEventListener('click', () => save());


	typeSelect.addEventListener('change', () => {
		selectedType = typeSelect.value;
	});

	load().then(() => resize(pre, previewPre, leftPre, rightPre));
};

charpg();
