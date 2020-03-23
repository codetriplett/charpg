export function flip (frame) {
	return frame.map((line, i) => {
		frame[i] = [...line].reverse().join('').replace(/\//g, '\\');
	});
}
