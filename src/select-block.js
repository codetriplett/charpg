export function selectBlock (chunk, mask, yPercent, xPercent) {
	const lineIndex = Math.floor(mask.length * yPercent);
	const characterIndex = Math.floor(mask[0].length * xPercent);
	const charCode = mask[lineIndex].charCodeAt(characterIndex);

	if (charCode >= 65535) {
		return;
	}

	const surface = charCode % 3;
	const index = Math.floor(charCode / 3);
	const offset = [729, 27, 1][surface];
	let y = Math.floor(index / 729) - 1;
	let z = Math.floor((index % 729) / 27);
	let x = index % 27;

	if (y < 0) {
		switch (surface) {
			case 1:
				y = z;
				z = -1;

				break;
			case 2:
				y = z;
				z = x;
				x = -1;

				break;
		}
	}

	return [x, z, y, offset];
}
