var gutil = require('gulp-util');

var dir = {
	source:			'source/',
	dest:				'build/',
	scripts:		'assets/js/',
	styles:			'assets/css/',
	images:			'assets/img/'
};

var files = {
	scripts: [
		dir.source + dir.scripts + '*.js',
		dir.source + dir.scripts + '**/*.js',
		'!**/vendor/**'
	],
	scriptsMain: dir.source + dir.scripts + 'app.js',
	statics: [
		dir.source + '**/*.jpg',
		dir.source + '**/*.png',
		dir.source + '**/*.gif',
		dir.source + '**/*.html',
		dir.source + '**/*.hbs',
		dir.source + '**/*.json',
		dir.source + '**/*.js',
		dir.source + 'index.js',
		'!' + dir.source + dir.scripts + '/**'
	],
	styles: [
		dir.source + dir.styles + '*.styl',
		dir.source + dir.styles + '**/*.styl',
		'!**/vendor/**'
	],
	stylesMain:	dir.source + dir.styles + 'app.styl',
};

var rjsOptimize = 'none';
var rjsPragmas = {};
var rjsStub = [];
var rjsFilesExclude = /^\./;

if(gutil.env.dist) {
	rjsOptimize = 'uglify2';
}

var mod = {
	dir: dir,
	files: files,
	opt: {
		jshint: {
			'passfail':		false,
			'maxerr':			100,
			'browser':		true,
			'predef': [
				'require',
				'define',
				'module',
				'angular'
			],
			'-W099':			true,
			eqeqeq:				true,
			eqnull:				true,
			indent:				true,
			undef:				true,
			browser:			true,
			debug:				true,
			devel:				true,
			unused:				'vars',
			white:				false,
			indent:				2
		},
		nodemon: {
			script: 'build/index.js',
			env: {'NODE_ENV': 'development'},
			verbose: false,
			execMap: {
				js: 'gnode.cmd --debug=9999',
			},
			watch: 'nofile.js'
		}
	}
};

module.exports = mod;