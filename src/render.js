import { drawChunk } from './draw-chunk.js';

export function render (pre, chunk, skipBorders) {
	const lines = drawChunk(chunk, skipBorders);
	const blank = String.fromCharCode(-1);

	pre.innerText = lines.join('\n').replace(/￿/g, ' ');
	return lines.mask.map(line => line.replace(/￿/g, blank));
}
