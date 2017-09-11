import * as path from 'path';
import * as gulp from 'gulp';
import * as del from 'del';
import * as webpack from 'webpack';
import * as gutil from 'gulp-util';
import * as nodemon from 'gulp-nodemon';
import * as sequence from 'gulp-sequence';
import { BaseConfig } from './config/base.config';

/*---Config---*/

const config = new BaseConfig();
let run = false;

/*---Gulp Task---*/

gulp.task('clean', () =>
	del(path.join(config.pathHelper('dist/'), "**/*"))
);

gulp.task('webpack', (cb) =>
	webpack(config.webpack, outputHandler(cb))
);

gulp.task('compile', sequence('clean', 'webpack'));

gulp.task('express', () =>
	nodemon({
		script: config.pathHelper('dist/server.js')
	})
);

gulp.task('start', sequence('compile', 'express'));

/*---Helpers---*/
function outputHandler(cb) {
	return (err, stats) => {
		if(err) {
			new gutil.PluginError(
				'webpack', `Error on webpack build: ${err.message}`
			);
		}
		gutil.log('[webpack]', stats.toString(config.webpack.stats));
		if (!config.webpack.watch) {
			cb();
		} else if (!run) {
			run = true;
			cb();
		}
	}
}
