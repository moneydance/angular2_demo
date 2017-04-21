import {Gulpclass, Task, SequenceTask} from "gulpclass/Decorators";
//import gulp from 'gulp';
import typescript from 'gulp-tsc';
import tslint from 'gulp-tslint';
import rimraf from 'gulp-rimraf';
import typedoc from 'gulp-typedoc';

let gulp = require('gulp');

@Gulpclass()
export class Gulpfile {
	private static readonly CONFIG: any = {
		paths: {
			ts: {
				path: 'src/**/*.ts',
			},
			stat: {
				path: ['src/**/*', '!src/**/*.ts'],
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
			formatter: 'stylish'
		},
		rimraf: {
			force: true
		},
		typedoc: {
			module: 'commonjs',
			target: 'es5',
			includeDeclarations: true,
			out: 'doc/',
			readme: '.',
			hideGenerator: true,
			name: 'Sidious Super Cool Angular2 App Demo'
		}
	};

	/**
	 * Task to run lint formatting on src code
	 */
	@Task('lint-src')
	lintSrc() {
  		return gulp.src(Gulpfile.CONFIG.paths.ts.path)
    		.pipe(tslint(Gulpfile.CONFIG.tslint))
    		.pipe(tslint.report());
	}

	/**
	 * Task to compile typescript code in src
	 */
	@Task('tsc', ['lint-src'])
	tsc() {
  		return gulp.src(Gulpfile.CONFIG.paths.ts.path, Gulpfile.CONFIG.paths.dist.options)
    		.pipe(typescript())
    		.pipe(gulp.dest(Gulpfile.CONFIG.paths.dist.path));
	}

	/*
	 * Task to move static files over to the dist
	 */
	@Task('mv-static-src', ['lint-src'])
	mvStaticSrc() {
		return gulp.src(Gulpfile.CONFIG.paths.stat.path, Gulpfile.CONFIG.paths.dist.options)
			.pipe(gulp.dest(Gulpfile.CONFIG.paths.dist.path));
	}

	/**
	 * Task to compile code base
	 */
	@Task('compile', ['tsc', 'mv-static-src'])
	compile() {}

	/**
	 * Task to clean the dist folder by running force rm -rf on it.
	 */
	@Task('clean')
	clean() {
  		return gulp.src([Gulpfile.CONFIG.paths.dist.path])
    		.pipe(rimraf(Gulpfile.CONFIG.rimraf));
	}

	/**
	 * Task to build jsdoc documentation in README.md
	 */
	@Task('doc')
	doc() {
		return gulp.src(Gulpfile.CONFIG.paths.ts.path)
			.pipe(typedoc(Gulpfile.CONFIG.typedoc));
	}

	/**
	 * Default Task
	 */
	@SequenceTask('default')
	default() {
		return ['clean', 'compile', 'doc'];
	}
}
