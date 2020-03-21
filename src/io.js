import { inflate } from './inflate.js';

const chunks = {};

export function io (x, z, y, chunk) {
	const name = [x, z, y].join('_');

	if (chunk) {
		return fetch(`/tiles/${name}.json`, {
			method: 'POST',
			body: JSON.stringify(chunk)
		});
	} else if (!chunks.hasOwnProperty(name)) {
		return fetch(`/tiles/${name}.json`)
			.then(response => response.json())
			.catch(() => inflate([Array(9).fill(Array(10).join(' '))], 9))
			.then(chunk => chunks[name] = chunk);
	}

	return Promise.resolve(chunks[name]);
}
