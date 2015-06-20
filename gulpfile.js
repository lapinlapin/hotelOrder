var tinyLr = require('tiny-lr'),
	gulp = require('gulp'),
	jade = require('gulp-jade'),
	stylus = require('gulp-stylus'),
	livereload = require('gulp-livereload'),
	myth = require('gulp-myth'),
	csso = require('gulp-csso'),
	imagemin = require('gulp-imagemin'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	connect = require('connect'),
	serveStatic = require('serve-static'),
	nib = require('nib');
	server = tinyLr();

gulp.task('json', function() {
	gulp.src('./src/json/**/*.json')
		.on('error', console.log)
		.pipe(gulp.dest('./public/'))
		.pipe(livereload(server));
});

gulp.task('jade', function() {
	gulp.src('./src/tmpl/**/*.jade')
		.pipe(jade({pretty: true}))
		.on('error', console.log)
		.pipe(gulp.dest('./public/'))
		.pipe(livereload(server));
});

gulp.task('stylus', function() {
	gulp.src('./src/stylus/**/*.styl')
		.pipe(stylus({use: nib(), compress: true}))
		.on('error', console.log)
		.pipe(myth())
		.pipe(concat('index.css'))
		.pipe(gulp.dest('./public/css/'))
		.pipe(livereload(server));
});

gulp.task('js', function() {
	gulp.src(['./src/js/**/*.js', '!./src/js/vendor/**/*.js'])
		.pipe(concat('index.js'))
		.pipe(gulp.dest('./public/js'))
		.pipe(livereload(server));
});

gulp.task('images', function() {
	gulp.src('./src/img/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./public/img'))
});

gulp.task('http-server', function() {
	connect()
		.use(require('connect-livereload')())
		.use(serveStatic(__dirname + '/public'))
		.listen('9000');
	console.log('listening on 9000');
});

gulp.task('watch', function() {
	gulp.run('json');
	gulp.run('stylus');
	gulp.run('jade');
	gulp.run('images');
	gulp.run('js');

	server.listen(35729, function(err) {
		if (err) return console.log(err);

		gulp.watch('src/stylus/**/*.styl', function() {
			gulp.run('stylus');
		});
		gulp.watch('src/json/**/*.json', function() {
			gulp.run('json');
		});
		gulp.watch('src/tmpl/**/*.jade', function() {
			gulp.run('jade');
		});
		gulp.watch('src/img/**/*', function() {
			gulp.run('images');
		});
		gulp.watch('src/js/**/*', function() {
			gulp.run('js');
		});
	});

	gulp.start('http-server');
});

gulp.task('default',['watch','stylus','jade','js','images','http-server', 'json']);