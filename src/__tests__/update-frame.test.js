import { drawBlock } from '../draw-block';
import { updateFrame } from '../update-frame';

describe('update-frame', () => {
	let frame;

	beforeEach(() => {
		frame = [
			'￿￿￿￿￿￿￿￿￿￿￿￿',
			'￿￿____￿￿￿￿￿￿',
			'￿/___/|￿￿￿￿￿',
			'￿|___|/￿￿￿￿￿',
			'￿￿￿￿￿￿￿￿￿￿￿￿'
		];
	});

	it('block', () => {
		const block = drawBlock(false, false, false, '');
		const empty = Array(5).fill(Array(13).join('￿'));

		updateFrame(empty, 2, 0, 0, 0, block);
		expect(empty).toEqual(frame);
	});

	it('after', () => {
		const block = drawBlock(false, false, false, '');
		updateFrame(frame, 2, 1, 0, 0, block);

		expect(frame).toEqual([
			'￿￿￿￿￿￿￿￿￿￿￿￿',
			'￿￿________￿￿',
			'￿/___/___/|￿',
			'￿|___|___|/￿',
			'￿￿￿￿￿￿￿￿￿￿￿￿'
		]);
	});

	it('as before', () => {
		const block = drawBlock(true, false, false, '');
		updateFrame(frame, 2, 1, 0, 0, block);

		expect(frame).toEqual([
			'￿￿￿￿￿￿￿￿￿￿￿￿',
			'￿￿________￿￿',
			'￿/_______/|￿',
			'￿|_______|/￿',
			'￿￿￿￿￿￿￿￿￿￿￿￿'
		]);
	});

	it('as before when only before was above', () => {
		const block = drawBlock(true, false, false, '');
		frame[3] = '￿|   |￿￿￿￿￿￿';
		updateFrame(frame, 2, 1, 0, 0, block);

		expect(frame).toEqual([
			'￿￿￿￿￿￿￿￿￿￿￿￿',
			'￿￿________￿￿',
			'￿/_______/|￿',
			'￿|    ___|/￿',
			'￿￿￿￿￿￿￿￿￿￿￿￿'
		]);
	});

	it('ahead', () => {
		const block = drawBlock(false, false, false, '');
		updateFrame(frame, 2, 0, 1, 0, block);

		expect(frame).toEqual([
			'￿￿￿￿￿￿￿￿￿￿￿￿',
			'￿￿____￿￿￿￿￿￿',
			'￿/___/|￿￿￿￿￿',
			'/___/|/￿￿￿￿￿',
			'|___|/￿￿￿￿￿￿'
		]);
	});

	it('as before', () => {
		const block = drawBlock(false, true, false, '');
		updateFrame(frame, 2, 0, 1, 0, block);

		expect(frame).toEqual([
			'￿￿￿￿￿￿￿￿￿￿￿￿',
			'￿￿____￿￿￿￿￿￿',
			'￿/   /|￿￿￿￿￿',
			'/___/ /￿￿￿￿￿',
			'|___|/￿￿￿￿￿￿'
		]);
	});

	it('above', () => {
		const block = drawBlock(false, false, false, '');
		updateFrame(frame, 2, 0, 0, 1, block);

		expect(frame).toEqual([
			'￿￿____￿￿￿￿￿￿',
			'￿/___/|￿￿￿￿￿',
			'￿|___|/￿￿￿￿￿',
			'￿|___|/￿￿￿￿￿',
			'￿￿￿￿￿￿￿￿￿￿￿￿'
		]);
	});

	it('as below', () => {
		const block = drawBlock(false, false, true, '');
		updateFrame(frame, 2, 0, 0, 1, block);

		expect(frame).toEqual([
			'￿￿____￿￿￿￿￿￿',
			'￿/___/|￿￿￿￿￿',
			'￿|   ||￿￿￿￿￿',
			'￿|___|/￿￿￿￿￿',
			'￿￿￿￿￿￿￿￿￿￿￿￿'
		]);
	});
});
