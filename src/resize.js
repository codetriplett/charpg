import { locateOffset } from './locate-offset.js';

export function resize (isRotated, ...divs) {
	const { clientWidth: innerWidth, clientHeight: innerHeight } = document.body;
	const shift = isRotated ? 1 : -1;

	divs.forEach(div => {
		const { clientWidth, clientHeight } = div;
		const widthScale = innerWidth * 0.9 / clientWidth;
		const heightScale = innerHeight * 0.9 / clientHeight;
		const minimumScale = Math.min(widthScale, heightScale);
		const [xOffset, zOffset] = locateOffset(div);
		const x = -50 + xOffset * 78.25 + zOffset * 19.5 * shift;
		const z = -50 + zOffset * 47.25;

		div.style.transform = `scale(${minimumScale}) translate(${x}%, ${z}%)`;
	});
}
