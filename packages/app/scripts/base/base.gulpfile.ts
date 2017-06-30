import {Gulpclass, Task, SequenceTask} from 'gulpclass-extendable/Decorators';
import * as gulp from 'gulp';
import * as rimraf from 'gulp-rimraf';
import * as typedoc from 'gulp-typedoc';
import * as webpack from 'webpack-stream';
import * as named from 'vinyl-named';

@Gulpclass
export class BaseGulpFile {
  constructor(private config:any) {}
	/**
	 * Task to clean the dist folder by running force rm -rf on it.
	 */
	@Task('clean')
	clean() {
		return gulp.src(this.config.paths.dist.path)
			.pipe(rimraf(this.config.rimraf));
	}

	/**
	 * Task to compile typescript code in src
	 */
	@Task('webpack')
	tsc() {
		return gulp.src(this.config.paths.entry.path)
			.pipe(named())
			.pipe(webpack(this.config.webpack))
			.pipe(gulp.dest(this.config.paths.dist.path));
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
