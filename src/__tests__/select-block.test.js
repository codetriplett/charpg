import prepareMask from '../prepare-mask';
import selectBlock from '../select-block';

describe('select-block', () => {
	let chunk;
	let mask;

	beforeEach(() => {
		chunk = [['  ', '  '], ['  ', '  ']];
		mask = prepareMask(2);
	});

	it('selects bottom surface', () => {
		const selection = selectBlock(chunk, mask, 0.7, 0.727);
		expect(selection).toEqual([1, 0, -1, 4]);
	});

	it('selects back surface', () => {
		const selection = selectBlock(chunk, mask, 0.5, 0.818);
		expect(selection).toEqual([1, -1, 0, 2]);
	});

	it('selects left surface', () => {
		const selection = selectBlock(chunk, mask, 0.3, 0.227);
		expect(selection).toEqual([-1, 0, 1, 1]);
	});

	it('selects block', () => {
		mask.splice(3, 2,
			'￿\u0005\u0000\u0000\u0000\u0000\u0015\u0015\u0015\u0015\u0017',
			'￿\u0006\u0006\u0006\u0006\u0016\u0016\u0016\u0016￿￿'
		);

		const selection = selectBlock(chunk, mask, 0.7, 0.727);
		expect(selection).toEqual([1, 1, 0, 4]);
	});
});
