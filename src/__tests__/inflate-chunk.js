import { inflateChunk } from '../inflate-chunk';

describe('inflate-chunk', () => {
	it('inflates all dimensions to length', () => {
		const chunk = inflateChunk([['d']], 3);

		expect(chunk).toEqual([
			['d  ', '   ', '   '],
			['   ', '   ', '   '],
			['   ', '   ', '   ']
		]);
	});
});
