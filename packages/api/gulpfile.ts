import * as gulp from 'gulp';
import * as yargs from 'yargs';
import { BaseConfig } from './config/base/base.config';
import { BaseGulpFile } from './scripts/base/base.gulpfile';

var config = new BaseConfig();
if (yargs.argv.watch) {
	config.webpack.watch = true;
}
new BaseGulpFile(config);
