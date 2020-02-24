import { drawChunk } from './draw-chunk.js';

export function render (chunk, pre, skipBorders) {
	const lines = drawChunk(chunk, skipBorders);
	pre.innerText = lines.join('\n').replace(/￿/g, ' ');
	return lines.mask;
}
