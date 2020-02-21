import { rotateChunk } from '../rotate-chunk';

describe('rotate-chunk', () => {
	let chunk;

	beforeEach(() => {
		chunk = [
			['123', '456', '789'],
			['123', '456', '789'],
			['123', '456', '789']
		];
	});

	it('rotates counter clockwise', () => {
		const actual = rotateChunk(chunk);

		expect(actual).toEqual([
			['369', '258', '147'],
			['369', '258', '147'],
			['369', '258', '147']
		]);
	});

	it('rotates clockwise', () => {
		const actual = rotateChunk(chunk, true);

		expect(actual).toEqual([
			['741', '852', '963'],
			['741', '852', '963'],
			['741', '852', '963']
		]);
	});
});
