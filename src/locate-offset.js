export function locateOffset (div) {
	const { classList } = div;
	let x = 0;
	let z = 0;

	if (classList.contains('before')) {
		x = -1;
	} else if (classList.contains('after')) {
		x = 1;
	}

	if (classList.contains('behind')) {
		z = -1;
	} else if (classList.contains('ahead')) {
		z = 1;
	}

	return [x, z, 0];
}
