export function selectBlock (chunk, mask, yPercent, xPercent) {
	const lineIndex = Math.floor(mask.length * yPercent);
	const characterIndex = Math.floor(mask[0].length * xPercent);
	const charCode = mask[lineIndex][characterIndex].charCodeAt(0);

	if (charCode >= 65535) {
		return;
	}

	const rowLength = chunk[0].length;
	const rowSize = chunk[0][0].length;
	const layerSize = rowSize * rowLength;
	const surface = charCode % 3;
	const index = Math.floor(charCode / 3);
	let y = Math.floor(index / layerSize) - 1;
	let z = Math.floor(index / rowSize) % rowLength;
	let x = index % rowSize;
	let offset = layerSize;

	if (y < 0) {
		switch (surface) {
			case 1:
				y = z;
				z = -1;
				offset = rowSize;

				break;
			case 2:
				y = z;
				z = x;
				x = -1;
				offset = 1;

				break;
		}
	}

	return [x, z, y, offset];
}
