import drawChunk from '../draw-chunk';

describe('draw-chunk', () => {
	let full;

	beforeEach(() => {
		full = [
			['eee', 'eee', 'eee'],
			['eee', 'eee', 'eee'],
			['eee', 'eee', 'eee'],
		]
	});

	it('alone', () => {
		const chunk = drawChunk(full, undefined, undefined, undefined);

		expect(chunk).toEqual(Object.assign([
			'￿￿￿____________￿',
			'￿￿/           /|',
			'￿/           / |',
			'/___________/  |',
			'|           |  /',
			'|           | /￿',
			'|___________|/￿￿'
		], { mask: expect.anything() }));
	});

	it('cornerless', () => {
		const chunk = drawChunk([
			[' e ', 'eee', ' e '],
			['eee', 'eee', 'eee'],
			[' e ', 'eee', ' e ']
		]);

		expect(chunk).toEqual(Object.assign([
			'￿￿￿￿￿￿￿____￿￿￿￿￿',
			'￿￿____/   /|___￿',
			'￿/___     ___/||',
			'￿|__/___/|___| /',
			'/___|   |/__/ |￿',
			'|___     ___|//￿',
			'￿￿￿￿|___|/￿￿￿￿￿￿'
		], { mask: expect.anything() }));
	});

	it('pyramid', () => {
		const chunk = drawChunk([
			['eee', 'eee', 'eee'],
			[' e ', 'eee', ' e '],
			['   ', ' e ', '   ']
		]);

		expect(chunk).toEqual(Object.assign([
			'￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿',
			'￿￿￿￿￿￿_____￿￿￿￿￿',
			'￿￿___/___/||___￿',
			'￿/___|___|/__/||',
			'￿|__/___/|___| /',
			'/___|   |/__/ /￿',
			'|___________|/￿￿'
		], { mask: expect.anything() }));
	});

	it('chunk of brick', () => {
		const chunk = drawChunk([
			['bbb', 'bbb', 'bbb'],
			['bbb', 'bbb', 'bbb'],
			['bbb', 'bbb', 'bbb']
		]);

		expect(chunk).toEqual(Object.assign([
			'￿￿￿____________￿',
			'￿￿/___/___/___/|',
			'￿/___/___/___/||',
			'/___/___/___/|/|',
			'|___|___|___|/|/',
			'|_|___|___|_||/￿',
			'|___|___|___|/￿￿'
		], { mask: expect.anything() }));
	});
});
