import prepareMask from '../prepare-mask';

describe('prepare-mask', () => {
	it('sets appropriate characters', () => {
		const mask = prepareMask(2);

		expect(mask).toEqual([
			'￿￿￿￿￿￿￿￿￿￿￿',
			'￿￿\u0008\u0007\u0007\u0007\u0007\u000a\u000a\u000a\u000a',
			'￿\u000b\u0002\u0001\u0001\u0001\u0001\u0004\u0004\u0004\u0004',
			'￿\u0005\u0000\u0000\u0000\u0000\u0003\u0003\u0003\u0003￿',
			'￿\u0006\u0006\u0006\u0006\u0009\u0009\u0009\u0009￿￿'
		]);
	});
});
