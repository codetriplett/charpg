export function prepareMask (length) {
	const mask = [];

	for (let i = 0; i < length * 2; i++) {
		const blank = Array(Math.abs(i - length) + 1).join('￿');
		let prefix = '';
		let suffix = '';
		let content = '';
		let code;

		if (i < length) {
			suffix = blank;
			code = 27 * (length - 1 - i) * 3;
		} else {
			prefix = blank;
			code = 27 * (i - length) * 3 + 1;
		}

		for (let j = prefix.length; j < length - suffix.length; j++) {
			content += String.fromCharCode((i * 27 + length - j * (27 + 1) - 28) * 3 + 2);
		}

		for (let j = 0; j < length; j++) {
			content += Array(5).join(String.fromCharCode(code + j * 3));
		}

		mask.unshift(`${prefix}${content}${content.slice(-1)}${suffix}`);
	}

	if (mask.length) {
		mask.unshift(Array(mask[0].length + 1).join('￿'));
	}

	return mask;
}
