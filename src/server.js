const http = require('http');
const fs = require('fs');
const port = 8080;

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

const template = `<!doctype html>
<html>
	<head>
		<title>ChaRPG</title>
		<link rel="icon" type="image/x-icon" href="/icon.ico">
	</head>
	<body>
		<script src="/charpg.js"></script>
	</body>
</html>`;

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

http.createServer((req, res) => {
	const { url, method, headers: { host } } = req;
	const extension = (url.match(/^.*?(\.[^.]*)?$/)[1] || '').slice(1);
	const type = types[extension] || '';
	const encoding = type.endsWith('; charset=utf-8') ? 'utf8' : '';

	if (!extension) {
		let content = template;

		if (/^localhost(:\d+)?$/.test(host)) {
			content = content.replace('script', 'script type="module"');
		}

		respond(res, content, types.html);
		return;
	} else if (method === 'POST') {
		const [coordinates] = url.match(/[^/]+(?=\.json$)/) || [];
		let body = '';

		if (coordinates.split('_').some(value => value < -8 || value > 8)) {
			respond(res);
			return;
		}

		req.on('data', chunk => body += chunk.toString());

		req.on('end', () => {
			fs.writeFile(`${__dirname}${url}`, body, encoding, err => {
				respond(res, err ? undefined : 'Success');
			});
		});

		return;
	}

	fs.readFile(`${__dirname}${url}`, encoding, (err, content) => {
		respond(res, err ? undefined : content, type);
	});
}).listen(port, () => console.log(`server is listening on ${port}`));
