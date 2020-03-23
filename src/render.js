import { drawChunk } from './draw-chunk.js';

export function render (chunk, pre, skipBorders, isRotated) {
	const lines = drawChunk(chunk, skipBorders, isRotated);
	pre.innerText = lines.join('\n').replace(/￿/g, ' ');
	return lines.mask;
}
