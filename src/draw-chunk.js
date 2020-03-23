import { prepareMask } from './prepare-mask.js';
import { prepareFrame } from './prepare-frame.js';
import { drawBlock } from './draw-block.js';
import { updateFrame } from './update-frame.js';
import { flip } from './flip.js';

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

export function drawChunk (chunk, skipBorders, isRotated) {
	const { length } = chunk;
	const mask = prepareMask(length, isRotated);
	const frame = prepareFrame(length, skipBorders);

	chunk.reduce((previousLayer = [], layer, y) => {
		layer.reduce((previousRow = '', row, z) => {
			const direction = isRotated ? 'reduceRight' : 'reduce';
			let i = 0;

			[...row][direction]((previousBlock, block, x) => {
				const asBefore = block === (previousBlock || ' ');
				const asBehind = block === (previousRow[x] || ' ');
				const asBelow = block === ((previousLayer[z] || [])[x] || ' ');
				let pattern;

				if (block !== ' ') {
					pattern = (patterns[block] || [])[(y % 2) + 1] || '';

					if (isRotated && pattern) {
						const [c0, c1, c2, c3, c4, c5, c6, c7, c8] = pattern;
						pattern = [c0, c3, c2, c1, c4, c7, c6, c5, c8].join('');
					}
				}

				const lines = drawBlock(asBefore, asBehind, asBelow, pattern);

				if (lines) {
					updateFrame(frame, length, i, z, y, lines);

					if (block !== ' ') {
						const index = (y + 1) * 729 + z * 27 + x;
						updateFrame(mask, length, i, z, y, drawBlock(index));
					}
				}

				i++;
				return block;
			}, '');

			return row;
		}, []);

		return layer;
	}, []);

	if (isRotated) {
		flip(frame);
		flip(mask);
	}

	return Object.assign(frame, { mask });
}
