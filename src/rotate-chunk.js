export function rotateChunk (chunk, reversed) {
	const { length } = chunk;
	const lastIndex = length - 1;
	const result = [];

	chunk.forEach(layer => {
		const resultLayer = Array(length).fill('');
		result.push(resultLayer);

		layer.forEach(row => {
			row.split('').forEach((block, x) => {
				if (reversed) {
					resultLayer[x] = `${block}${resultLayer[x]}`;
				} else {
					resultLayer[lastIndex - x] += block;
				}
			});
		});
	});

	return result;
}
