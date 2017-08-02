import { Gulpclass, Task, SequenceTask } from 'gulpclass-extendable/Decorators';
import * as path from 'path';
import * as gulp from 'gulp';
import * as del from 'del';
import * as webpack from 'webpack';
import * as gutil from 'gulp-util';
import * as childProcess from 'child_process';

@Gulpclass
export class BaseGulpFile {
	private run:boolean = false;

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
	 * Task that runs in a seperate non blocking webpack process so watch
	 * doesnt cause gulp task to run indefinetly
	 */
	@Task('spawn_webpack_process')
	public spawn_webpack_process(cb) {
		const outputHandler = (err, stats) => {
			if(err) {
				new gutil.PluginError(
					'webpack', `Error on webpack build: ${err.message}`
				);
			}
			gutil.log('[webpack]', stats.toString(this.config.webpack.stats));
			if (!this.config.webpack.watch) {
				cb();
				process.send({done: true});
			} else if (!this.run) {
				this.run = true;
				cb();
				process.send({done: true});
				process.disconnect();
			}
		}
		webpack(this.config.webpack, outputHandler);
	}
	/**
	* Task creates a new process that runs gulp spawn_webpack_process.
	* new process is non blocking and allows the gulpfile to complete.
	*/
	@Task('webpack')
	public pack(cb) {
		const webpack_watch = childProcess
			.spawn('gulp', ['spawn_webpack_process'], this.config.spawn);
		webpack_watch.on('message', (msg) => {
			if (msg.done) {
				cb();
			}
		});
		webpack_watch.unref();
	}

	/**
	 * Task to compile code base
	 */
	@SequenceTask('compile')
	public compile() {
		return ['clean', 'webpack'];
	}

	/**
	 * Default Task
	 */
	@SequenceTask('default')
	public default() {
		return ['compile']
	}
}
