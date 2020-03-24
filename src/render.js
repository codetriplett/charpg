import { drawChunk, alphabet, patterns } from './draw-chunk.js';

export function render (chunk, element, skipBorders, isRotated) {
	const lines = drawChunk(chunk, skipBorders, isRotated);
	const { palette, mask } = lines;

	if (element.tagName.toLowerCase() === 'pre') {
		element.innerText = lines.join('\n').replace(/￿/g, ' ');
	} else {
		[...element.childNodes].forEach(child => element.removeChild(child));

		lines.forEach((line, i) => {
			const div = document.createElement('div');
			const [...ids] = palette[i];
			let start = 0;

			element.appendChild(div);
			line = line.replace(/￿/g, ' ');

			while (start < ids.length) {
				const length = ids.slice(start).findIndex(id => {
					return id !== ids[start];
				});

				const finish = length !== -1 ? start + length : line.length;
				const pre = document.createElement('pre');
				const id = ids[start].charCodeAt(0);
				const pattern = patterns[alphabet[Math.floor(id / 3)]];
				let style = '';
				let surface = '';

				if (pattern) {
					style = pattern[0];
					surface = ['above', 'ahead', 'after'][id % 3];
				}

				pre.innerText = line.slice(start, finish);
				pre.className = `${style} ${surface}`;
				div.appendChild(pre);
				start = finish;
			}
		});
	}

	return mask;
}
