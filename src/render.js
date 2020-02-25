import { drawChunk } from './draw-chunk.js';

export function render (chunk, pre, skipBorders, leftText, rightText) {
	const lines = drawChunk(chunk, skipBorders);
	const lastIndex = lines.length - 1;

	if (leftText) {
		const [direction, coordinates] = leftText;

		lines[2] = `${direction}${lines[2].slice(direction.length)}`;
		lines[1] = `${coordinates}${lines[1].slice(coordinates.length)}`;
	}

	if (rightText) {
		const [direction, coordinates] = rightText;
		
		lines[lastIndex - 1] = `${lines[lastIndex - 1].slice(0, -direction.length)}${direction}`;
		lines[lastIndex] = `${lines[lastIndex].slice(0, -coordinates.length)}${coordinates}`;
	}

	pre.innerText = lines.join('\n').replace(/￿/g, ' ');
	return lines.mask;
}
