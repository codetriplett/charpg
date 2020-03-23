import { drawBlock } from '../draw-block';

describe('draw-block', () => {
	describe('empty', () => {
		it('alone', () => {
			const block = drawBlock(false, false, false);
			expect(block).toEqual(['￿/￿￿￿￿', '￿|___￿', '￿￿￿￿￿￿']);
		});

		it('as before', () => {
			const block = drawBlock(true, false, false);
			expect(block).toEqual(['￿￿￿￿￿￿', '￿____￿', '￿￿￿￿￿￿']);
		});

		it('as behind', () => {
			const block = drawBlock(false, true, false);
			expect(block).toEqual(['￿/￿￿￿￿', '￿￿￿￿￿￿', '￿￿￿￿￿￿']);
		});

		it('as below', () => {
			const block = drawBlock(false, false, true);
			expect(block).toEqual(['￿￿￿￿￿￿', '￿|￿￿￿￿', '￿￿￿￿￿￿']);
		});

		it('as before and behind', () => {
			const block = drawBlock(true, true, false);
			expect(block).toBeUndefined();
		});

		it('as before and below', () => {
			const block = drawBlock(true, false, true);
			expect(block).toBeUndefined();
		});

		it('as behind and below', () => {
			const block = drawBlock(false, true, true);
			expect(block).toBeUndefined();
		});

		it('as before, behind and below', () => {
			const block = drawBlock(true, true, true);
			expect(block).toBeUndefined();
		});
	});

	describe('mask', () => {
		it('sets numbers', () => {
			const block = drawBlock(10);
			const top = Array(5).join(String.fromCharCode(30));
			const front = Array(5).join(String.fromCharCode(31));
			const right = String.fromCharCode(32);

			expect(block).toEqual([
				`${front}${right}￿`,
				`${top}${right}${right}`,
				'￿￿￿￿￿￿'
			]);
		});
	});

	describe('block', () => {
		let pattern;

		beforeEach(() => {
			pattern = '   .   ..';
		});

		it('default', () => {
			const block = drawBlock(false, false, false, '');
			expect(block).toEqual(['|___|/', '/___/|', '￿____￿']);
		});

		it('alone', () => {
			const block = drawBlock(false, false, false, pattern);
			expect(block).toEqual(['|__.|/', '/__./|', '￿____￿']);
		});

		it('as before', () => {
			const block = drawBlock(true, false, false, pattern);
			expect(block).toEqual(['___.|/', '___./|', '￿____￿']);
		});

		it('as behind', () => {
			const block = drawBlock(false, true, false, pattern);
			expect(block).toEqual(['|__.|/', '/__./.', '￿     ']);
		});
		
		it('as below', () => {
			const block = drawBlock(false, false, true, pattern);
			expect(block).toEqual(['|  .|￿', '/__./|', '￿____￿']);
		});

		it('as before and behind', () => {
			const block = drawBlock(true, true, false, pattern);
			expect(block).toEqual(['___.|/', '___./.', '￿     ']);
		});

		it('as before and below', () => {
			const block = drawBlock(true, false, true, pattern);
			expect(block).toEqual(['   .|￿', '___./|', '￿____￿']);
		});

		it('as behind and below', () => {
			const block = drawBlock(false, true, true, pattern);
			expect(block).toEqual(['|  .|￿', '/__./.', '￿     ']);
		});

		it('as before, behind and below', () => {
			const block = drawBlock(true, true, true, pattern)
			expect(block).toEqual(['   .|￿', '___./.', '￿     ']);
		});
	});
});
