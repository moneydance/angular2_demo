import { Gulpclass, Task, SequenceTask } from 'gulpclass-extendable/Decorators';
import { BaseGulpFile } from '../base/base.gulpfile';
import * as gulp from 'gulp';
import { DevConfig } from "../../config/dev/dev.config";

@Gulpclass
export class DevGulpFile extends BaseGulpFile {
  constructor(config:any) {
    super(config);
  }
}

