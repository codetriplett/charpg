module.exports = function (grunt) {
	function merge (path, files, resolve) {
		const lib = path.startsWith('./lib/');
		const regex = lib ? /^/ : /(^|[ \r\n]*)(import[^;]*;[ \r\n]*|export (default )?|module.exports = )/g;

		grunt.file.write(path, files.map(path => {
			let file = grunt.file.read(path).replace(regex, '');

			if (!resolve) {
				return file;
			}

			return resolve(file, path.match(/[^.\/]+(?=\.[^\/]+$)/)[0]);
		}).join('\n'));
	}

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		babel: {
			main: {
				files: {
					'./dist/charpg.min.js': './dist/charpg.min.js'
				}
			}
		},
		uglify: {
			main: {
				options: {
					banner: [
						'/*',
						' <%= pkg.name %>',
						' v<%= pkg.version %>',
						' */'
					].join('')
				},
				files: {
					'dist/charpg.min.js': 'dist/charpg.min.js'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('before', () => {
		merge('./dist/charpg.min.js', [
			'./src/draw-block.js',
			'./src/draw-chunk.js',
			'./src/inflate-chunk.js',
			'./src/prepare-frame.js',
			'./src/prepare-mask.js',
			'./src/render.js',
			'./src/resize.js',
			'./src/rotate-chunk.js',
			'./src/select-block.js',
			'./src/update-frame.js',
			'./src/charpg.js'
		]);
	});

	grunt.registerTask('after', function () {
		const path = './dist/charpg.min.js';

		grunt.file.write(path, `(function () {
			${grunt.file.read(path)}
			window.charpg = charpg;
		})();`);
	});

	grunt.registerTask('default', [
		'before',
		'babel',
		'after',
		'uglify'
	]);
};
