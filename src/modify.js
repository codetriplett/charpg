export function modify ([x, z, y], chunk, block = ' ') {
	const line = chunk[y][z];
	chunk[y][z] = `${line.slice(0, x)}${block || ' '}${line.slice(x + 1)}`;
}
