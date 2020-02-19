export function prepareFrame () {
	const length = 27;
	const upper = Array(length * 5 + 2).join('￿')
	const lower = `${upper.slice(0, length)}/${upper.slice(0, length * 4 - 1)}/`;
	const frame = [];

	for (let i = 0; i < length * 2 + 1; i++) {
		let line = upper;

		if (i <= length) {
			line = lower;

			if (i % length === 0) {
				line = line.replace(/￿(?=￿*\/$)/g, '_');

				if (i === length) {
					line = line.replace('￿/', '￿_').replace('/', '￿');
				}
			}

			if (i < length) {
				const shift = length - i;
				line = `${line.slice(shift)}${line.slice(0, shift)}`;
			}
		}

		frame.unshift(line);
	}

	return frame;
}
