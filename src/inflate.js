export function inflate (chunk = []) {
	return [...chunk, ...Array(9 - chunk.length)].map((layer = []) => {
		return [...layer, ...Array(9 - layer.length)].map((row = '') => {
			return `${row}${Array(10 - row.length).join(' ')}`;
		});
	});
}
