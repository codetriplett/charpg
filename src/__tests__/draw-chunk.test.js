import { drawChunk } from '../draw-chunk';

describe('draw-chunk', () => {
	let full;

	beforeEach(() => {
		full = [
			['ddd', 'ddd', 'ddd'],
			['ddd', 'ddd', 'ddd'],
			['ddd', 'ddd', 'ddd'],
		]
	});

	it('alone', () => {
		const chunk = drawChunk(full, true);

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
			[' d ', 'ddd', ' d '],
			['ddd', 'ddd', 'ddd'],
			[' d ', 'ddd', ' d ']
		], true);

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
			['ddd', 'ddd', 'ddd'],
			[' d ', 'ddd', ' d '],
			['   ', ' d ', '   ']
		], true);

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
		], true);

		expect(chunk).toEqual(Object.assign([
			'￿￿￿____________￿',
			'￿￿/_/___/___/_/|',
			'￿/_/___/___/_//|',
			'/_/___/___/_//||',
			'|_|___|___|_||//',
			'|___|___|___|//￿',
			'|_|___|___|_|/￿￿'
		], { mask: expect.anything() }));
	});

	it('flipped', () => {
		const chunk = drawChunk([
			['ddd', 'ddd', 'ddd'],
			['ddd', ' dd', '  d'],
			['  d', '   ', '   ']
		], true, true);

		expect(chunk).toEqual(Object.assign([
			'￿￿￿￿￿￿￿￿￿____￿￿￿',
			'￿_______|\\___\\￿￿',
			'|\\___   \\|___|￿￿',
			'||___|\\___    \\￿',
			'\\ \\  \\|___|\\___\\',
			'￿\\ \\______\\|   |',
			'￿￿\\|___________|'
		], { mask: expect.anything() }));
	});
});
