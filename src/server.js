const http = require('http');
const fs = require('fs');
const { MongoClient } = require('mongodb');

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

function capture (req) {
	return new Promise(resolve => {
		let body = '';
		
		req.on('data', (data) => {
			body += data;

			if (body.length > 1e6) {
				req.connection.destroy();
			}
		});

		req.on('end', () => resolve(body));
	});
}

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

function store (database, folder, name, value) {
	return MongoClient.connect(database).catch(() => {}).then(client => {
		if (!client) {
			return;
		}

		const index = database.lastIndexOf('/');
		const db = client.db(database.slice(index + 1));

		if (db) {
			const collection = db.collection(folder);

			if (collection) {
				return collection.findOne({ name }).then(document => {
					if (!document) {
						return collection.insertOne({ name, value });
					}

					return collection.updateOne({ name }, {
						$set: { name, value }
					});
				}).then(() => {
					client.close();
					return 'Tile Saved';
				});
			}
		}

		client.close();
		return Promise.resolve();
	});
}

function retrieve (database, folder, name) {
	return MongoClient.connect(database).catch(() => {}).then(client => {
		if (!client) {
			return;
		}

		const index = database.lastIndexOf('/');
		const db = client.db(database.slice(index + 1));
		let tile;

		if (db) {
			const collection = db.collection(folder);

			if (collection) {
				tile = collection.findOne({ name });
			}
		}

		client.close();
		return tile;
	});
}

export default function (port, directory, database) {
	http.createServer((req, res) => {
		let { url, method } = req;
		let extension = (url.match(/^.*?(\.[^.]*)?$/)[1] || '').slice(1);
		let recorder;
	
		if (method.toLowerCase() === 'post') {
			recorder = capture(req);
		} else if (url === '/') {
			url += 'index';
		}

		if (recorder || extension === 'json') {
			const index = url.lastIndexOf('/');
			const folder = url.slice(1, index);
			const name = url.slice(index + 1, -5);

			if (!database && (!folder || !name)) {
				respond(res);
			} else if (recorder) {
				recorder.then(body => {
					store(database, folder, name, body).then(message => {
						respond(res, message);
					});
				});
			} else {
				retrieve(database, folder, name).then(data => {
					respond(res, data ? data.value : undefined, extension);
				});
			}

			return;
		} else if (!extension) {
			extension = 'html';
			url += `.${extension}`;
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
