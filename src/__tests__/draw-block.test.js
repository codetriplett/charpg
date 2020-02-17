
import drawBlock from '../draw-block';

describe('draw-block', () => {
	describe('empty', () => {
		it('alone', () => {
			const block = drawBlock(' ', false, false, false);
			expect(block).toEqual(['￿/￿￿￿￿', '￿|___￿', '￿￿￿￿￿￿']);
		});

		it('as before', () => {
			const block = drawBlock(' ', true, false, false);
			expect(block).toEqual(['￿￿￿￿￿￿', '￿____￿', '￿￿￿￿￿￿']);
		});

		it('as behind', () => {
			const block = drawBlock(' ', false, true, false);
			expect(block).toEqual(['￿/￿￿￿￿', '￿￿￿￿￿￿', '￿￿￿￿￿￿']);
		});

		it('as below', () => {
			const block = drawBlock(' ', false, false, true);
			expect(block).toEqual(['￿￿￿￿￿￿', '￿|￿￿￿￿', '￿￿￿￿￿￿']);
		});

		it('as before and behind', () => {
			const block = drawBlock(' ', true, true, false);
			expect(block).toBeUndefined();
		});

		it('as before and below', () => {
			const block = drawBlock(' ', true, false, true);
			expect(block).toBeUndefined();
		});

		it('as behind and below', () => {
			const block = drawBlock(' ', false, true, true);
			expect(block).toBeUndefined();
		});

		it('as before, behind and below', () => {
			const block = drawBlock(' ', true, true, true);
			expect(block).toBeUndefined();
		});
	});

	describe('block', () => {
		it('alone', () => {
			const block = drawBlock('e', false, false, false);
			expect(block).toEqual(['|___|/', '/___/|', '￿____￿']);
		});

		it('as before', () => {
			const block = drawBlock('e', true, false, false);
			expect(block).toEqual(['____|/', '____/|', '￿____￿']);
		});

		it('as behind', () => {
			const block = drawBlock('e', false, true, false);
			expect(block).toEqual(['|___|/', '/___/ ', '￿     ']);
		});
		
		it('as below', () => {
			const block = drawBlock('e', false, false, true);
			expect(block).toEqual(['|   |￿', '/___/|', '￿____￿']);
		});

		it('as before and behind', () => {
			const block = drawBlock('e', true, true, false);
			expect(block).toEqual(['____|/', '____/ ', '￿     ']);
		});

		it('as before and below', () => {
			const block = drawBlock('e', true, false, true);
			expect(block).toEqual(['    |￿', '____/|', '￿____￿']);
		});

		it('as behind and below', () => {
			const block = drawBlock('e', false, true, true);
			expect(block).toEqual(['|   |￿', '/___/ ', '￿     ']);
		});

		it('as before, behind and below', () => {
			const block = drawBlock('e', true, true, true)
			expect(block).toEqual(['    |￿', '____/ ', '￿     ']);
		});
	});
});
