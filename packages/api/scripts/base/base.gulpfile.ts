import { Gulpclass, Task, SequenceTask } from 'gulpclass-extendable/Decorators';
import * as path from 'path';
import * as gulp from 'gulp';
import * as del from 'del';
import * as webpack from 'webpack';
import * as gutil from 'gulp-util';
import * as yargs from 'yargs';
import * as nodemon from 'gulp-nodemon'

@Gulpclass
export class BaseGulpFile {
	private run:boolean = false;
	private watch:boolean = false;
	constructor(protected config:any) {}
	/**
	 * Task to clean the dist folder by running force rm -rf on it.
	 */
	@Task('clean')
	public clean(cb) {
		del(path.join(this.config.paths.dist.path, "**/*"))
		cb();
	}

	/**
	 * Task that runs non blocking webpack process so watch
	 * doesnt cause gulp task to run indefinetly
	 */
	@Task('webpack')
	public pack(cb) {
		webpack(this.config.webpack, this.webpackOutputHandler(cb));
	}

	@Task('webpack-watch')
	public watchPack(cb) {
		this.watch = true;
		webpack(
			{ ...this.config.webpack, ...{ watch: true } },
 			this.webpackOutputHandler(cb)
		);
	}

	/**
	 * Task to compile code base
	 */
	@SequenceTask('compile')
	public compile() {
		if (yargs.argv.watch) {
			return ['clean', 'webpack-watch'];
		}
		return ['clean', 'webpack'];
	}

	@Task('koa')
	public koa(cb) {
		nodemon({
			script: this.config.paths.dist_entry.path
		});
	}

	@SequenceTask('start')
	public start(cb) {
		return ['compile', 'koa'];
	}

	protected webpackOutputHandler(cb) {
		return (err, stats) => {
			if(err) {
				new gutil.PluginError(
					'webpack', `Error on webpack build: ${err.message}`
				);
			}
			gutil.log('[webpack]', stats.toString(this.config.webpack.stats));
			if (!this.watch) {
				cb();
			} else if (!this.run) {
				this.run = true;
				cb();
			}
		}
	}
}
