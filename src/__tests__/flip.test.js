import { flip } from '../flip';

describe('flip', () => {
	it('flips', () => {
		const frame = [
			'￿￿￿￿￿￿￿￿￿￿￿￿',
			'￿￿____￿￿￿￿￿￿',
			'￿/___/|￿￿￿￿￿',
			'￿|___|/￿￿￿￿￿',
			'￿￿￿￿￿￿￿￿￿￿￿￿'
		];

		flip(frame);

		expect(frame).toEqual([
			'￿￿￿￿￿￿￿￿￿￿￿￿',
			'￿￿￿￿￿￿____￿￿',
			'￿￿￿￿￿|\\___\\￿',
			'￿￿￿￿￿\\|___|￿',
			'￿￿￿￿￿￿￿￿￿￿￿￿'
		]);
	});
});
