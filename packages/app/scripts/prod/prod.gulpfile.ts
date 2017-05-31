/*
import {Gulpclass, Task, SequenceTask} from 'gulpclass/Decorators';
import * as typedoc from 'gulp-typedoc';

import BaseGulpFile from 'base.gulpfile';

export default class ProdGulpFile extends BaseGulpFile {
	@Task('doc')
	doc() {
		return gulp.src(config.path.ts.path)
			.pipe(typedoc(config.typedoc));
	}

	@SequenceTask('default')
	default() {
		return ['compile', 'doc'];
	}
}
*/
