export function drawBlock (asBefore, asBehind, asBelow, pattern) {
	if (typeof asBefore === 'number') {
		const charCode = asBefore * 3;
		const top = Array(5).join(String.fromCharCode(charCode));
		const front = Array(5).join(String.fromCharCode(charCode + 1));
		const right = String.fromCharCode(charCode + 2);

		return [
			`${front}${asBehind ? right : front[0]}${asBehind ? '￿' : right}`,
			`${top}${asBehind ? right : top[0]}${right}`,
			'￿￿￿￿￿￿'
		];
	} else if (pattern === undefined) {
		if (asBefore + asBehind + asBelow > 1) {
			return;
		}

		const edgeX = !asBehind && !asBelow;
		const edgeZ = !asBefore && !asBelow;
		const edgeY = !asBefore && !asBehind;

		return [
			`￿${edgeZ ? '/' : '￿'}￿￿￿￿`,
			`￿${edgeY ? '|' : edgeX ? '_' : '￿'}${edgeX ? '___' : '￿￿￿'}￿`,
			'￿￿￿￿￿￿'
		];
	} else if (!pattern) {
		pattern = '         ';
	}

	const above = pattern.slice(0, 4).replace(/ /g, '_');
	const ahead = pattern.slice(4, 8).replace(/ /g, asBelow ? ' ' : '_');
	const after = asBehind ? pattern[8] : '|';

	return [
		`${asBefore ? ahead : `|${ahead.slice(1)}`}|${asBelow ? '￿' : '/'}`,
		`${asBefore ? above : `/${above.slice(1)}`}/${after}`,
		asBehind && /[^_|/]/.test(pattern) ? '￿     ' : '￿____￿'
	];
}
