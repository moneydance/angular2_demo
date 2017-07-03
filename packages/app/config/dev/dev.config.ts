import * as path from 'path';
import { BaseConfig } from '../base/base.config';

export class DevConfig extends BaseConfig {
  constructor() {
    super();
    let pathsOverride = {
      env : {path: path.join(this.baseDir, 'config/dev/dev.env')}
    };
    Object.assign(this.paths, pathsOverride);
  }
}
