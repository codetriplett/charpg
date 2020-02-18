import { prepareMask } from './prepare-mask.js';
import { drawBlock } from './draw-block.js';
import { updateFrame } from './update-frame.js';

export function drawChunk (chunk) {
	const { length } = chunk;
	const mask = prepareMask(length);
	const frame = Array(mask.length).fill(mask[0]);
	let index = Math.pow(length, 2);

	chunk.reduce((previousLayer = [], layer, y) => {
		layer.reduce((previousRow = [], row, z) => {
			row.split('').reduce((previousBlock, block, x) => {
				const asBefore = block === (previousBlock || ' ');
				const asBehind = block === (previousRow[x] || ' ');
				const asBelow = block === ((previousLayer[z] || [])[x] || ' ');
				const lines = drawBlock(block, asBefore, asBehind, asBelow, y % 2);

				if (lines) {
					updateFrame(frame, length, x, z, y, lines);

					if (block !== ' ') {
						updateFrame(mask, length, x, z, y, drawBlock(index));
					}
				}

				index++;
				return block;
			}, '');

			return row;
		}, []);

		return layer;
	}, []);

	return Object.assign(frame, { mask });
}
