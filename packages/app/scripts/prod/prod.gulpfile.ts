import { Gulpclass, Task, SequenceTask } from 'gulpclass-extendable/Decorators';
import { BaseGulpFile } from '../base/base.gulpfile';
import * as typedoc from 'gulp-typedoc';
import * as gulp from 'gulp';

@Gulpclass
export class ProdGulpFile extends BaseGulpFile {
  constructor(config:any) {
    super(config);
  }

  @Task('doc')
  doc() {
    return gulp.src(this.config.path.ts.path)
      .pipe(typedoc(this.config.typedoc));
  }

  @SequenceTask('default')
  default() {
    return ['compile', 'doc'];
  }
}

