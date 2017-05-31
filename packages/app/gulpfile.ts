import {Gulpclass, Task, SequenceTask} from 'gulpclass/Decorators';
import * as gulp from 'gulp';
import * as rimraf from 'gulp-rimraf';
import * as typedoc from 'gulp-typedoc';
import * as webpack from 'webpack-stream';
import * as named from 'vinyl-named';

import {BaseConfig as Config} from './config/base.config';
const config = new Config();

@Gulpclass()
export class Gulpfile {
	/**
	 * Task to clean the dist folder by running force rm -rf on it.
	 */
	@Task('clean')
	clean() {
		return gulp.src(config.paths.dist.path)
			.pipe(rimraf(config.rimraf));
	}


	/**
	 * Task to compile typescript code in src
	 */
	@Task('webpack')
	tsc() {
		return gulp.src(config.paths.entry.path)
			.pipe(named())
			.pipe(webpack(config.webpack))
			.pipe(gulp.dest(config.paths.dist.path));
	}


	/**
	 * Task to compile code base
	 */
	@SequenceTask('compile')
	compile() {
		return ['clean', 'webpack'];
	}

	/**
	 * Default Task
	 */
	@Task('default', ['compile'])
	default() {}
}
