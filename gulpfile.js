// Goi thu vien gulp
const gulp = require('gulp');
const gulpif = require('gulp-if');
const rename = require('gulp-rename');
const useref = require('gulp-useref');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
//const cleanCSS = require('gulp-clean-css');
// const babel = require('gulp-babel');  // Công cụ chuyển đổi ECMAScript phiên bản mới về phiên bản cũ hơn trước đó npm install @babel/core --save
// const htmlTemplate = require('gulp-template-html');
const uglify = require('gulp-uglify');  // Tối ưu file Javascript
const browserSync = require('browser-sync').create();
const livereload = require('gulp-livereload');
const runSequence = require('run-sequence');
const plumber = require('gulp-plumber');
//const htmlclean = require('gulp-htmlclean');  // Nén file HTML
const notify = require('gulp-notify');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const beautify = require('gulp-beautify');
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');  // Nén ảnh
const wait = require('gulp-wait');
const ejs = require('gulp-ejs');
const log = require('fancy-log');
const index = require('gulp-index');  // Creat sitemap
const template = require("gulp-template");
const fileinclude = require('gulp-file-include'); // NeW __ npm install --save-dev gulp-file-include
// const extender = require('gulp-html-extend'); // NeW __ npm install --save-dev gulp-html-extend
// const inject = require('gulp-inject'); // NeW__ npm install --save-dev gulp-inject
//const twig = require("gulp-twig");
const jshint = require('gulp-jshint');									//phân tích mã JavaScript về chất lượng và thực thi tiêu chuẩn / phong cách
const uglifyes = require('gulp-uglify-es').default;			//npm i gulp-uglify-es
// npm i gulp-jshint-html-reporter  //validator js export report to file html
const replace = require('gulp-replace');
const removeSourcemaps = require('gulp-remove-sourcemaps');
var cssMin = require('gulp-css');

const AUTOPREFIXER_BROWSERS = [
	'last 2 version',
	'> 1%',
	'ie >= 9',
	'ie_mob >= 10',
	'ff >= 30',
	'chrome >= 34',
	'safari >= 7',
	'opera >= 23',
	'ios >= 7',
	'android >= 4',
	'bb >= 10'
];


// test gulp task basic | OK
gulp.task('alo', function() {
	console.log('Hello alo');
});
gulp.task('blo', done => {
	console.log('Hello blo');
	done();
});



// Sass  | OK
// gulp.task('sass', function () {
// 	return gulp.src('app/scss/styles.scss')
// 		.pipe(sass())
// 		.pipe(gulp.dest('app/css'))
// 	.pipe(livereload());
// });

// Sass   | OK
gulp.task('sass', done => {
	return gulp
	.src([
		'app/scss/styles-pc.min.scss',
		'app/scss/styles-mobile.min.scss',
		//'app/scss/responsive.scss',
	])
	.pipe(sourcemaps.init())
	.pipe(plumber({
		errorHandler: notify.onError("Error: <%= error.message %>")
	}))
	.pipe(wait(500))
	.pipe(sass({
		outputStyle: 'compressed'
	}).on('error', sass.logError))
	.pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
	.pipe(sourcemaps.write('maps'))
	.pipe(gulp.dest('dist/css'))
	.pipe(browserSync.reload({
		stream: true
	}));
	done();
});

// copy css & replace path For APPLICATION_ENV: development
gulp.task('cssreplaceDev', done => {
	return gulp
	.src([
		'dist/css/styles-pc.min.css',
		'dist/css/styles-mobile.min.css'
	])
	.pipe(replace('/*!@charset*/','@charset "UTF-8";'))
	.pipe(removeSourcemaps())
	.pipe(cssMin())
	.pipe(rename({prefix: "dev-"}))
	.pipe(gulp.dest('dist/cssdev'))
	done();
});

// copy css & replace path For APPLICATION_ENV: != development
gulp.task('cssreplace', done => {
	return gulp
	.src([
		'dist/css/styles-pc.min.css',
		'dist/css/styles-mobile.min.css'
	])
	.pipe(replace('/*!@charset*/','@charset "UTF-8";'))
	.pipe(removeSourcemaps())
	.pipe(cssMin())
	.pipe(gulp.dest('dist/csslive'))
	done();
});


gulp.task('js', function() {
  return gulp.src([
      'app/js/lib/jquery.min.js',
      // 'app/js/lib/popper.min.js',
      'app/js/lib/bootstrap.bundle.min.js', // Bootstrap v5.1.1
      'app/js/lib/swiper.min.js',
      'app/js/lib/aos.js',
      'app/js/lib/jquery.countTo.js',
      'app/js/lib/tilt.jquery.min.js',
      // 'app/js/lib/jquery.countdown.min.js',
      // 'app/js/lib/perfect-scrollbar.js',
      // 'app/js/lib/lightgallery-all.min.js',
      // 'app/js/lib/lg-thumbnail.js',
      // 'app/js/lib/fancybox.umd.js', // fancybox v4+
      // 'app/js/lib/dragscroll.js', // Drag mouse scroll _ page brand
      // 'app/js/lib/jquery.magnific-popup.min.js',
      // 'app/js/lib/bootbox.min.js',
      'app/js/lib/sweetalert2.all.min.js',
      // 'app/js/lib/notify.js',
      'app/js/form.js',
      'app/js/script-pc.js',
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('all.js'))
    // .pipe(uglify())
    .pipe(uglifyes())
    .pipe(rename('bundle-pc.min.js'))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('dist/js'));
});
gulp.task('jsMobile', function() {
  return gulp.src([
      'app/js/lib/jquery.min.js',
      // 'app/js/lib/popper.min.js',
      'app/js/lib/bootstrap.min.js',
      'app/js/lib/swiper.min.js',
      // 'app/js/lib/jquery.countdown.min.js',
      // 'app/js/lib/perfect-scrollbar.js',
      // 'app/js/lib/lightgallery-all.min.js',
      // 'app/js/lib/lg-thumbnail.js',
      // 'app/js/lib/jquery.fancybox.min.js', // fancybox origin conflict file of VnE
      // 'app/js/lib/fancybox.umd.js', // fancybox v4+
      // 'app/js/lib/jquery.magnific-popup.min.js',
      // 'app/js/lib/bootbox.min.js',
      // 'app/js/lib/sweetalert2.all.min.js',
      // 'app/js/lib/notify.js',
      'app/js/script-mb.js',
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('all.js'))
    // .pipe(uglify())
    .pipe(uglifyes())
    .pipe(rename('bundle-mobile.min.js'))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('dist/js'));
});



var condition = function (file) {
  // TODO: add business logic
  return true;
}
gulp.task('beautyjs', function() {
  gulp.src('app/js/lib/*.js')
    .pipe(gulpif(condition, uglify()))
    .pipe(gulp.dest('dist/js/'));
});



// Optimizing CSS and JavaScript 
gulp.task('useref', function(done) {
  return gulp.src('app/*.html')
    .pipe(useref())
    // .pipe(gulpif('app/js/*.js', uglify()))
    // .pipe(gulpif('app/css/*.css', cssnano()))
    .pipe(gulp.dest('dist'));
    done();
});


// Validate js - OK fine
// npm i gulp-jshint-html-reporter
gulp.task('lint', function(done) {
		return gulp.src('app/js/*.js')
				.pipe(jshint())
				.pipe(
						jshint.reporter("gulp-jshint-html-reporter", {
								filename: __dirname + "/jshint-output.html",
								createMissingFolders: false
						})
				);
    done();
});


// Optimizing Images | OK
gulp.task('images', function() {
  return gulp.src('app/images/**/*.+(png|PNG|jpg|JPG|jpeg|gif|svg|ico|webp)')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
      interlaced: true,
    })))
    .pipe(gulp.dest('dist/images'));
    done();
});


// Copy Fonts tới Dist
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});
// End Copy Fonts tới Dist


// Build Pages | OK
gulp.task('html', function(done) {
  gulp.src(['app/page/*.html'])
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      context: {
        device: 'pc'
      }
    }))
    .pipe(beautify.html({ indent_size: 2 }))
    .pipe(gulp.dest("dist"))
		.pipe(browserSync.reload({
		  stream: true
		}));
		done();
});
gulp.task('htmlMobile', function(done) {
  gulp.src(['app/page/mobile/*.html'])
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      context: {
        device: 'mobile'
      }
    }))
    .pipe(beautify.html({ indent_size: 2 }))
    .pipe(gulp.dest("dist"))
		.pipe(browserSync.reload({
		  stream: true
		}));
		done();
});
// async function footer() { /* async task */ }

// gulp.task('buildejs', done => {
// 	return gulp.src('app/page/*.ejs')
// 	    .pipe(ejs({footer}).on('error',log),{async:true})
// 	    .pipe(gulp.dest('dist'));
// 	console.log('Finish task Ejs');
// 	done();

// });


async function menuCate() { /* async task */ }
gulp.task('buildeEjs', done => {
	return gulp.src('app/page/**/*.ejs')
	    .pipe(ejs({menuCate}).on('error',log),{async:true})
	    .pipe(gulp.dest('dist'));
		console.log('Finish task Ejs menuCate');
	done();

});



// Tasks buil images access | OK
gulp.task('images_sync', gulp.parallel(
		'images',
	)
);


// Watch Files For Changes | OK
gulp.task('watch', function () {
	gulp.watch('app/scss/**/*.scss', gulp.series('sass','cssreplace'));
	gulp.watch('app/js/**/*.js', gulp.series('js'), browserSync.reload);
	gulp.watch('app/images/**/*', gulp.series('images'));
	gulp.watch('app/scss/images-pc/**/*', gulp.series('images_sync'));
	gulp.watch('app/scss/images-mobile/**/*', gulp.series('images_sync'));
	gulp.watch('app/page/**/*.html', gulp.series('html','htmlMobile'));
	// gulp.watch('app/page/mobile/*.html', gulp.series('htmlMobile'));
	console.log('Finish task watch');
});

// Watch Files For Changes | OK
// gulp.task('watch', function () {
//     livereload.listen();
//     gulp.watch('app/scss/**/*.scss', gulp.series('sass'));
// });


// Start browserSync server | OK
gulp.task('browserSync', function() {
	browserSync.init({
		port: 3008,
		server: {
			baseDir: 'dist',
			directory: true
		},
		startPath: 'index.html'
	})
});


// Build Sequences | not ok
gulp.task('default', function(callback) {
	runSequence(['sass', 'html_pc', 'browserSync'], 'watch',
		callback
	)
});


// Build Site-maps Demo
const fs = require('fs');
gulp.task('buildIndex', function() {
  return gulp
    .src(['dist/*.html'])
    .pipe(
      index({
        'prepend-to-output': () =>
          fs.readFileSync('./app/index-partials/index-front-matter.html'),
        'append-to-output': () =>
          fs.readFileSync('./app/index-partials/index-end-matter.html'),
        title: 'Pages List',
        pathDepth: 1,
        'relativePath': './',
        'outputFile': './sitemap.html',
        'section-template': (sectionContent) => `<section class="index__section">
        ${sectionContent}</section>
        `,
          'section-heading-template': (heading) => `<h2 class="index__section-heading">${heading}</h2>
        `,
          'list-template': (listContent) => `<ul class="index__list">
        ${listContent}</ul>
        `,
        'item-template': (
          filepath,
          filename
        ) => `<li class="index__item"><a class="index__item-link" target="_blank" href="${filename}">${filename}</a></li>
                    `
      })
    )
    .pipe(gulp.dest('./dist'));
});
// End Build Site-maps Demo


// Start Copy file jquery to dist/js
gulp.task('copy_jquery', function(done) {
  return gulp.src('app/js/lib/jquery.min.js')
    .pipe(gulp.dest('dist/js'));
    done();
});
// End Copy file jquery to dist/js


// Tasks buil static access | OK
gulp.task('static', gulp.parallel(
		'js',
		'fonts',
		'images'
	)
);


// Tasks Run | OK
gulp.task('start', gulp.parallel(
		'sass',
		'js',
		'lint',
		// 'buildeEjs',
		'html',
		'htmlMobile',
		'watch',
		'browserSync'
	)
);