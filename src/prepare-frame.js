function shiftString (string, amount) {
	return `${string.slice(-amount)}${string.slice(0, -amount)}`;
}

export function prepareFrame (length, skipBorders) {
	const frame = [];

	if (skipBorders) {
		const blank = Array(length * 5 + 2).join('￿');

		for (let i = 0; i < length * 2 + 1; i++) {
			frame.push(blank);
		}

		return frame;
	}

	const blank = Array(length * 4 + 1).join('￿');
	const prefix = `/${Array(length).join('￿')}`;
	const upper = `|${blank.slice(1)}|`;
	const lower = `${blank.slice(0, length - 1)}/${blank}/`;

	for (let i = 0; i < length * 2; i++) {
		if (i < length) {
			let line = lower;

			if (!i) {
				line = line.replace(/￿(?=￿*\/$)/g, '_');
			}

			frame.unshift(`${shiftString(line, i - length + 1)}`.replace(/^./, '|'));
		} else {
			let line = upper;

			if (i === length) {
				line = line.replace(/￿/g, '_');
			}

			frame.unshift(`${shiftString(prefix, i - length)}${line}`);
		}
	}

	frame.unshift(`${Array(length + 1).join('￿')}${blank.replace(/./g, '_')}￿`);
	return frame;
}
