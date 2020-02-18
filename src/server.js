const http = require('http');
const fs = require('fs');
const port = 8080;

const types = {
	html: 'text/html; charset=utf-8',
	js: 'application/javascript; charset=utf-8',
	ico: 'image/x-icon'
};

const template = `<!doctype html>
<html>
	<head>
		<title>ChaRPG</title>
		<link rel="icon" type="image/x-icon" href="/icon.ico" />
	</head>
	<body>
		<script type="module" src="/charpg.js"></script>
		<script type="module">charpg([['e']]);</script>
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
		'Content-Type': type
	});

	res.end(content);
}

http.createServer(({ url }, res) => {
	const extension = (url.match(/^.*?(\.[^.]*)?$/)[1] || '').slice(1);
	const type = types[extension] || '';
	const encoding = type.endsWith('; charset=utf-8') ? 'utf8' : '';

	if (!extension) {
		respond(res, template, types.html);
		return;
	}

	fs.readFile(`${__dirname}${url}`, encoding, (err, content) => {
		respond(res, err ? undefined : content, type);
	});
}).listen(port, () => console.log(`server is listening on ${port}`));
