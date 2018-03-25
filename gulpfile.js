const gulp         = require('gulp');
const pug          = require('gulp-pug');
const stylus       = require('gulp-stylus');
const plumber      = require('gulp-plumber');
const postcss      = require('gulp-postcss');
const csso         = require('postcss-csso');
const autoprefixer = require('autoprefixer');
const gulpPugBeautify = require('gulp-pug-beautify');

const NODE_ENV = process.env.NODE_ENV || 'development';
const isDev    = NODE_ENV === 'development' || NODE_ENV === 'dev';
const isProd   = NODE_ENV === 'production'  || NODE_ENV === 'prod';

gulp.task('pug', () => {
  return gulp
    .src([`modules/*.pug`])
    .pipe( plumber() )
    .pipe( pug({pretty: true}) )
    .pipe(gulpPugBeautify({ omit_empty: true }))
    .pipe( gulp.dest('build') );
})



const postcssOptions = isProd
  ? [
      autoprefixer,
      csso({
        restructure: true,
        comments: false
      })
    ]
  : [autoprefixer];

gulp.task('stylus', () => {
  return gulp
    .src('styles/main.styl')
    .pipe( plumber() )
    .pipe( stylus() )
    .pipe( postcss(postcssOptions) )
    .pipe( gulp.dest('build/css') );
})



gulp.task('watch', () => {
  gulp.watch(['modules/**/*.pug', 'pug/**/*.pug'], ["pug"]);
  gulp.watch(['**/*.styl', 'modules/**/*.styl'], ["stylus"]);
});



gulp.task('default', ['pug', 'stylus']);
