import { Gulpclass, Task, SequenceTask } from 'gulpclass-extendable/Decorators';
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import * as gulp from 'gulp';
import * as del from 'del';
import * as typedoc from 'gulp-typedoc';
import * as webpackStream from 'webpack-stream-fixed';
import * as webpack from 'webpack';
import * as named from 'vinyl-named';
import * as gutil from 'gulp-util';

@Gulpclass
export class BaseGulpFile {
  constructor(protected config:any) {}
  /**
   * Task to clean the dist folder by running force rm -rf on it.
   */
  @Task('clean')
  clean(cb) {
    del(path.join(this.config.paths.dist.path, "**/*"))
    return cb();
  }

  /**
   * task to set environments
   */
  @Task('env')
  env(cb) {
      let env = dotenv.config(this.config.paths.env);
      dotenvExpand(env);
      return cb();
  }

  /**
   * Task to compile typescript code in src
   */
  @Task('webpack')
  tsc() {
    return gulp.src(this.config.paths.entry.path)
	  .pipe(named())
      .pipe(webpackStream(this.config.webpack, webpack))
      .on('error', function(error) {})
      .pipe(gulp.dest(this.config.paths.dist.path));
  }

  /**
   * Task to compile code base
   */
  @SequenceTask('compile')
  compile() {
    return [['clean', 'env'], 'webpack'];
  }

  /**
   * Default Task
   */
  @Task('default', ['compile'])
  default() {}
}
