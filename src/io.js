import { inflate } from './inflate.js';

const chunks = {};

export function io (x, z, y, chunk) {
	const name = [x, z, y].join('_');

	if (chunk) {
		localStorage.setItem(name, JSON.stringify(chunk));
	} else if (chunks.hasOwnProperty(name)) {
		chunk = chunks[name];
	} else if (localStorage.hasOwnProperty(name)) {
		chunk = JSON.parse(localStorage.getItem(name));
	} else if (name === '0_0_0') {
		return fetch(`/${name}.json`)
			.then(response => response.json())
			.catch(() => inflate([Array(9).fill(Array(10).join(' '))], 9))
			.then(chunk => chunks[name] = chunk);
	} else {
		chunk = inflate([Array(9).fill(Array(10).join(' '))], 9);
	}

	return Promise.resolve(chunks[name] = chunk);
}
