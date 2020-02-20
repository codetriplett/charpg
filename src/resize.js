export function resize (...preArray) {
	const { clientWidth: innerWidth, clientHeight: innerHeight } = document.body;

	preArray.forEach(pre => {
		const { clientWidth, clientHeight } = pre;
		const widthScale = innerWidth * 0.9 / clientWidth;
		const heightScale = innerHeight * 0.9 / clientHeight;
		const minimumScale = Math.min(widthScale, heightScale);

		pre.style.transform = `translate(-50%, -50%) scale(${minimumScale})`;
	});
}
