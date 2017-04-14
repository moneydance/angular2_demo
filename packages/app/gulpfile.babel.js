import gulp from 'gulp';
import typescript from 'gulp-tsc';
import tslint from 'gulp-tslint';
import rimraf from 'gulp-rimraf';
import runSequence from 'run-sequence';
import typedoc from 'gulp-typedoc';

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
    }
  },
  tslint: {
	formatter: "stylish"
  },
  rimraf: {
	force: true
  },
  typedoc: {
	module: "commonjs",
	target: "es5",
	includeDeclarations: true,
	out: 'doc/',
	readme: '.',
	hideGenerator: true,
	name: "Sidious' Super Cool Angular2 App Demo"
  }
};


/**
* Task to clean the dist folder by running force rm -rf on it.
*/
gulp.task('clean', () =>
  gulp.src([config.paths.dist.path])
    .pipe(rimraf(config.rimraf))
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
* Task to run tsc on src
*/
gulp.task('tsc-src', ['lint-src'], () =>
  gulp.src(config.paths.ts.path, config.paths.dist.options)
    .pipe(typescript())
    .pipe(gulp.dest(config.paths.dist.path))
);

/**
* Task to move static files over to the dist
*/

gulp.task('mv-static-src', ['lint-src'], () =>
  gulp.src(config.paths.stat.path, config.paths.dist.options)
    .pipe(gulp.dest(config.paths.dist.path))
);

/**
* Task to run lint formatting on src code
*/
gulp.task('lint-src', () =>
  gulp.src(config.paths.ts.path)
    .pipe(tslint(config.tslint))
    .pipe(tslint.report())
);


/**
* Task to build jsdoc documentation in README.md
*/
gulp.task('doc', () =>
  gulp.src(config.paths.ts.path)
    .pipe(typedoc(config.typedoc))
);

/**
* Default task
*/
gulp.task('default', () =>
  runSequence('clean', ['compile'], 'doc')
);
