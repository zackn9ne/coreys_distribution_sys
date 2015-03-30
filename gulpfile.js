'use strict';
// generated on 2015-01-13 using generator-gulp-webapp 0.1.0

var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith')

// load plugins automagic
var $ = require('gulp-load-plugins')();

/**
 *  * Push build to gh-pages
 *   */
gulp.task('deploy', function () {
    return gulp.src("./dist/**/*")
      .pipe($.ghPages())
});


gulp.task('sprite', function () {
  // Generate spritesheet
  var spriteData = gulp.src('app/images/spritesmith/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    imgPath: '../images/sprite.png',
    cssName: 'sprite.css'
  }));
  spriteData.img.pipe(gulp.dest('dist/images'));
  spriteData.img.pipe(gulp.dest('app/images'));

  // Pipe CSS stream through CSS optimizer and onto disk
  spriteData.css
    .pipe(gulp.dest('app/styles'));
    // .pipe(csso())
    // .pipe(gulp.dest('dist/styles'));
});

// safety-latch cuz image task sucks
gulp.task('clear_cache', function (done) {
    return $.cache.clearAll(done);
});

gulp.task('images', ['clear_cache'],function () {
    return gulp.src('app/images/**/*')
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe($.size());
});

gulp.task('styles', function () {
    return gulp.src('app/styles/main.scss')
        .pipe($.rubySass({
            style: 'expanded',
            precision: 10
        }))
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('.tmp/styles'))
        .pipe($.size());
});

gulp.task('scripts', function () {
    return gulp.src('app/scripts/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter(require('jshint-stylish')))
        .pipe($.size());
});

gulp.task('html', ['styles', 'scripts'], function () {
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');

    return gulp.src('app/*.html')
        .pipe($.useref.assets({searchPath: '{.tmp,app}'}))
        .pipe(jsFilter)
        .pipe($.uglify())
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe(cssFilter.restore())
        .pipe($.useref.restore())
        .pipe($.useref())
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});

// gulp.task('images', function () {
//     return gulp.src('app/images/**/*')
//         .pipe($.cache($.imagemin({
//             optimizationLevel: 3,
//             progressive: true,
//             interlaced: true
//         })))
//         .pipe(gulp.dest('dist/images'))
//         .pipe($.size());
// });
var config = {
     sassPath: './resources/sass',
     bowerDir: 'app/bower_components' 
}

// get fonts ready for distribution 1/2 sources //
gulp.task('moveBowerFonts', function() { 
    return gulp.src(config.bowerDir + '/font-awesome/fonts/**.*') 
      .pipe(gulp.dest('./dist/fonts')); 
});

// get fonts ready for distribution 2/2 sources //
gulp.task('moveBootstrapFonts', function() {
  return gulp.src(config.bowerDir + '/bootstrap-sass-official/vendor/assets/fonts/bootstrap/**.*')
      .pipe(gulp.dest('./dist/fonts')); 
});


gulp.task('extraPages', function () {
    return gulp.src(['app/*.*', '!app/*.html'], { dot: true })
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
    return gulp.src(['.tmp', 'dist'], { read: false }).pipe($.clean());
});

//main runner(s)
gulp.task('build', ['html', 'images', 'moveBootstrapFonts', 'moveBowerFonts', 'extraPages']);

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

gulp.task('connect', function () {
    var connect = require('connect');
    var app = connect()
        .use(require('connect-livereload')({ port: 35729 }))
        .use(connect.static('app'))
        .use(connect.static('.tmp'))
        .use(connect.directory('app'));

    require('http').createServer(app)
        .listen(9000)
        .on('listening', function () {
            console.log('Started connect web server on http://localhost:9000');
        });
});

gulp.task('serve', ['connect', 'styles'], function () {
    require('opn')('http://localhost:9000');
});

// inject bower components
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;

    gulp.src('app/styles/*.scss')
        .pipe(wiredep({
            directory: 'app/bower_components'
        }))
        .pipe(gulp.dest('app/styles'));

    gulp.src('app/*.html')
        .pipe(wiredep({
            directory: 'app/bower_components',
            exclude: ['bootstrap-sass-official']
        }))
        .pipe(gulp.dest('app'));
});


gulp.task('watch', ['connect', 'serve'], function () {
    var server = $.livereload();

    // watch for changes

    gulp.watch([
        'app/*.html',
        '.tmp/styles/**/*.css',
        'app/scripts/**/*.js',
        'app/images/**/*'
    ]).on('change', function (file) {
        server.changed(file.path);
    });

    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);
    gulp.watch('app/images/**/*', ['images']);
    gulp.watch('bower.json', ['wiredep']);
});
