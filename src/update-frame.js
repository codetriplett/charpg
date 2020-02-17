const replacements = { '￿': /[￿]/, '_': /[￿ ]/, ' ': /[_]/ };

export default function (frame, depth, x, z, y, lines) {
	const inverted = /^￿*$/.test(lines[0]);
	const start = depth + x * 4 - z - 1;

	lines.reduce((index, line, i) => {
		const finish = start + line.length;
		let string = frame[index];
		let section = string.slice(start, finish);
		
		section = line.replace(/[￿_ ]/g, (match, j) => {
			const character = section[j];

			if (!i && !j && match === '_' && character !== '￿') {
				return /_/.test(string.slice(start - 3, start)) ? match : ' ';
			} else if (!inverted && i < lines.length - 1) {
				return match === '￿' ? character : match;
			}

			return replacements[match].test(character) ? match : character;
		});

		string = `${string.slice(0, start)}${section}${string.slice(finish)}`;
		frame[index] = string;

		return index - 1;
	}, frame.length - depth + z - y);
}
