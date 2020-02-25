export function resize (...preArray) {
	const { clientWidth: innerWidth, clientHeight: innerHeight } = document.body;
	const positions = [-50, -50, -128.25, 28.25];

	preArray.forEach((pre, i) => {
		const { clientWidth, clientHeight } = pre;
		const widthScale = innerWidth * 0.9 / clientWidth;
		const heightScale = innerHeight * 0.9 / clientHeight;
		const minimumScale = Math.min(widthScale, heightScale);

		pre.style.transform = `scale(${minimumScale}) translate(${positions[i]}%, -50%)`;
	});
}
