export function inflateChunk (chunk = [], length = 27) {
	return [...chunk, ...Array(length - chunk.length)].map((layer = []) => {
		return [...layer, ...Array(length - layer.length)].map((row = '') => {
			return `${row}${Array(length - row.length + 1).join(' ')}`;
		});
	});
}
