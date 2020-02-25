export const patterns = {
	d: ['dirt', '         ', '         '],
	b: ['brick', '__/___|_/', '/___|___|'],
	s: ['sand', '. ` ` . `', ' . `` . `'],
	w: ['water', '~ ~      ', '~ ~      '],
	t: ['tree', ' (o) || |', ' (o)| |||'],
	l: ['leaf', ' ^ ^V v v', '^ ^  v Vv'],
	o: ['ore', ' o    O O', '  O o   o'],
	g: ['glass', '\\ \\ \\ \\ \\', ' \\ \\ \\ \\\\']
};

export function drawBlock (block, asBefore, asBehind, asBelow, isAlternate = false) {
	if (block === ' ') {
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
	} else if (!isNaN(block)) {
		const charCode = block * 3;
		const top = Array(5).join(String.fromCharCode(charCode));
		const front = Array(5).join(String.fromCharCode(charCode + 1));
		const right = String.fromCharCode(charCode + 2);

		return [`${front}${right}￿`, `${top}${right}${right}`, '￿￿￿￿￿￿'];
	}

	const {
		[block]: { [isAlternate + 1]: pattern = '         ' } = []
	} = patterns;

	const above = pattern.slice(0, 4).replace(/ /g, '_');
	const ahead = pattern.slice(4, 8).replace(/ /g, asBelow ? ' ' : '_');
	const after = asBehind ? pattern[8] : '|';

	return [
		`${asBefore ? ahead : ahead.replace(/^./, '|')}|${asBelow ? '￿' : '/'}`,
		`${asBefore ? above : above.replace(/^./, '/')}/${after}`,
		asBehind && block !== 'b' ? '￿     ' : '￿____￿'
	];
}
