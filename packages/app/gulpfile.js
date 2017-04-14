import gulp from 'gulp';
import typescript from 'gulp-tsc';
import eslint from 'gulp-eslint';
import rimraf from 'gulp-rimraf';
import runSequence from 'run-sequence';
import gulpdoc from 'gulp-documentation';

/**
 * Config variable
 */
var config = {
  paths: {
    js: {
      path: 'src/**/*.js',
    },
    stat: {
      path: ['src/**/*', '!src/**/*.js'],
    },
    dist: {
      path: 'dist/',
      options: {
        base: 'src'
      },
    },
    test: {
      path: 'dist/**/*.test.js'
    },
    doc: {
      path: 'docs/'
    }
  }
};


/**
* Task to clean the dist folder by running force rm -rf on it.
*/
gulp.task('clean', () =>
  gulp.src([config.paths.dist.path])
    .pipe(rimraf({ force: true }))
);

/**
* Task to compile code base
*/
gulp.task('compile', ['tsc', 'mv-static-src']);


/**
* Task to Run all tsc sub Tasks
*/
gulp.task('tsc', ['tsc-src']);


/**
* Sub task to run tsc on src
*/
gulp.task('tsc-src', ['lint-src'], () =>
  gulp.src(config.paths.ts.path, config.paths.dist.options)
    .pipe(typescript())
    .pipe(gulp.dest(config.paths.dist.path))
);

gulp.task('mv-static-src', ['lint-src'], () =>
  gulp.src(config.paths.stat.path, config.paths.dist.options)
    .pipe(gulp.dest(config.paths.dist.path))
);


/**
* Sub task to run lint formatting on src code
*/
gulp.task('lint-src', () =>
  gulp.src(config.paths.ts.path)
    .pipe(eslint())
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError())
);

/**
* Task to Run Test

gulp.task('test', ['compile'], (cb) =>
  gulp.src([config.paths.test.path])
    .pipe(mocha({ reporter: 'spec' }))
);
**/
/**
* Task to build jsdoc documentation in README.md
*/
gulp.task('doc', () =>
  gulp.src(config.paths.ts.path)
    .pipe(gulpdoc('html'))
    .pipe(gulp.dest(config.paths.doc.path))
);

/**
* Default task
*/
gulp.task('default', () =>
  //gulp.series('clean', gulp.parallel('babel', 'test', 'doc')) for v4 gulp
  runSequence('clean', ['compile'], 'doc')
);
