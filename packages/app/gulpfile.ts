import * as path from 'path';
import * as del from 'del';
import * as webpack from 'webpack';
import * as gutil from 'gulp-util';
import * as gulp from 'gulp';
import * as sequence from 'gulp-sequence';
import { ProdConfig } from './config/prod.config';
import { DevConfig } from './config/dev.config';

const env = process.env.ENV;
let config;
let webpackRun = false;

/*--Config--*/

switch (env) {
	case 'DEV':
		config = new DevConfig();
		break;
	case 'PROD':
		config = new ProdConfig();
		break;
	default:
		console.log('Please specify an ENV environment variable');
		process.exit();
}

/*--Gulp--*/

gulp.task('clean', () =>
	del(path.join(config.pathHelper('dist'), "**/*"))
);

gulp.task('webpack', ['clean'], (cb) =>
	webpack(config.webpack, webpackHandlerFactory(cb))
);

gulp.task('compile', ['webpack']);

// factory pattern to generate handler for webpack first run
const webpackHandlerFactory = cb =>
	(err, stats) => {
		if(err) {
			new gutil.PluginError(
				'webpack', `Error on webpack build: ${err.message}`
			);
		}
		gutil.log('[webpack]', stats.toString(config.webpack.stats));
		// code prevents webpack from blocking subsequent gulp taks and ensures 1 cb
		if (!webpackRun) {
			webpackRun = true;
			cb();
		}
	}
