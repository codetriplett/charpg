const http = require('http');
const fs = require('fs');

const types = {
	txt: 'text/html; charset=utf-8',
	html: 'text/html; charset=utf-8',
	css: 'text/css; charset=utf-8',
	js: 'application/javascript; charset=utf-8',
	json: 'application/json; charset=utf-8',
	svg: 'image/svg+xml; charset=utf-8',
	gif: 'image/gif',
	jpeg: 'image/jpeg',
	jpg: 'image/jpeg',
	png: 'image/png',
	ico: 'image/x-icon'
};

function respond (res, content, type) {
	let status = 200;

	if (content === undefined) {
		content = 'File not found';
		status = 404;
	} else if (!(content instanceof Buffer)) {
		content = String(content);
	}

	res.writeHead(status, {
		'Content-Length': Buffer.byteLength(content),
		'Content-Type': type || types.txt
	});

	res.end(content);
}

export default function (port, directory) {
	http.createServer(({ url }, res) => {
		let extension = (url.match(/^.*?(\.[^.]*)?$/)[1] || '').slice(1);
	
		if (url === '/') {
			url += 'index';
		}
	
		if (!extension) {
			extension = '.html';
			url += extension;
		}
	
		const type = types[extension] || '';
		const encoding = type.endsWith('; charset=utf-8') ? 'utf8' : '';

		fs.readFile(`${directory}${url}`, encoding, (err, content) => {
			if (!err || extension !== '.html') {
				respond(res, err ? undefined : content, type);
				return;
			}
			
			fs.readFile(`${directory}/404.html`, encoding, (err, content) => {
				respond(res, err ? undefined : content, type);
			});
		});
	}).listen(port, () => console.log(`server is listening on ${port}`));
}
