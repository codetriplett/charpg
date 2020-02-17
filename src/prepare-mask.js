export default function (length) {
	const mask = [];

	for (let i = 0; i < length * 2; i++) {
		const blank = Array(Math.abs(i - length) + 1).join('￿');
		let prefix = '￿';
		let suffix = '';
		let content = '';
		let code;

		if (i < length) {
			suffix += blank;
			code = length * (length - 1 - i) * 3;
		} else {
			prefix += blank;
			code = length * (i - length) * 3 + 1;
		}

		for (let j = prefix.length - 1; j < length - suffix.length; j++) {
			content += String.fromCharCode((i * length - j * (length + 1) - 1) * 3 + 2);
		}

		for (let j = 0; j < length; j++) {
			content += Array(5).join(String.fromCharCode(code + j * 3));
		}

		mask.unshift(`${prefix}${content}${suffix}`);
	}

	mask.unshift(Array(mask[0].length + 1).join('￿'));
	return mask;
}
