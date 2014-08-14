var cfg = require('./cfg.gulpfile.js');

var gulp = require('gulp');
var sequence = require('run-sequence');

var nodemon = require('gulp-nodemon');

var gutil = require('gulp-util');
var clean = require('gulp-rimraf');

var rjs = require('requirejs').optimize;
var jshint = require('gulp-jshint');
var jshint_stylish = require('jshint-stylish');

var stylus = require('gulp-stylus');
var jeet = require('jeet');
var rupture = require('rupture');
var normalize = require('stylus-normalize');
var autoprefix = require('gulp-autoprefixer');

var gnode = '';

var onErr = function(er){
	(er.message) ? gutil.log(gutil.colors.bgRed('[error]') + ' ' + er.message + '\n') : gutil.log(er + '\n');
	this.emit('end');
}

gulp.task('styles', function(){
	return gulp.src(cfg.files.stylesMain)
		.pipe(
			stylus({
				errors: true,
				use: [normalize(), rupture(), jeet()]
			})
		)
		.on('error', onErr)
		.pipe(autoprefix('last 4 versions', '> 2%', 'ie >= 8', 'ff >= 17'))
		.pipe(gulp.dest(cfg.dir.dest + cfg.dir.styles));
});

gulp.task('scripts', ['jshint'], function(cb){
	rjs(
		{
			baseUrl:				cfg.dir.source + cfg.dir.scripts,
			mainConfigFile:	cfg.files.scriptsMain,
			dir:						cfg.dir.dest + cfg.dir.scripts,
			optimize:				'none',
			optimizeCss:		'none',
			removeCombined:	true,
			modules: [
				{
					name: 'app',
					include: ['requirejs'],
					insertRequire: ['app'],
					exclude: ['libs']
				},
				{
					name: 'libs'
				}
			],
			skipPragmas: true,
			fileExclusionRegExp: /^\./
		},
		function(resp){
			cb();
		},
		onErr
	);
});

gulp.task('jshint', function(){
	return gulp.src(cfg.files.scripts)
		.pipe(jshint(cfg.opt.jshint))
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('statics', function(){
	return gulp.src(cfg.files.statics)
		.pipe(gulp.dest(cfg.dir.dest));
});

gulp.task('nodemon', ['build'], function () {
	gnode = nodemon(cfg.opt.nodemon);
});

gulp.task('nodemonRestart', ['statics'], function () {
	gnode.restart();
});

gulp.task('build', function(cb) {
	sequence('destClean', ['styles', 'statics', 'scripts'], cb);
});

gulp.task('destClean', function(){
	return gulp.src(cfg.dir.dest, {read: false})
		.pipe(clean());
});

gulp.task('cleanAll', function(){
	return gulp.src(['build', 'node_modules', 'bower_components'], {read: false})
		.pipe(clean());
});

gulp.task('watch', ['nodemon'], function() {
	gulp.watch([cfg.files.scripts], ['scripts'])
		.on('error', onErr);
	gulp.watch([cfg.files.styles], ['styles'])
		.on('error', onErr);
	return gulp.watch([cfg.files.statics], ['nodemonRestart'])
		.on('error', onErr);
});

gulp.task('default', ['build']);