import { inflate } from './inflate.js';

const chunks = {};

export function io (x, z, y, chunk) {
	const name = [x, z, y].join('_');

	if (!chunk && chunks.hasOwnProperty(name)) {
		return Promise.resolve(chunks[name]);
	}

	const url = location.toString().replace(/\/*$/, `/${name}.json`);

	if (chunk === undefined) {
		return fetch(url)
			.then(response => response.json())
			.catch(() => inflate([Array(9).fill(Array(10).join(' '))], 9))
			.then(chunk => chunks[name] = chunk);
	}
	
	const xhttp = new XMLHttpRequest();

	xhttp.open('POST', url, true);
	xhttp.send(JSON.stringify(chunk));
	chunks[name] = chunk;
}
