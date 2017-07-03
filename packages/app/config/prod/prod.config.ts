import { BaseConfig } from '../base/base.config';
import * as path from 'path';

export class ProdConfig extends BaseConfig {
  typedoc:any;

  constructor() {
    super();
    const webpackOverride = { watch: false };
    const pathsOverride = {
      doc: {
        in: { path: path.join(this.baseDir, 'src/') },
        out: { path: path.join(this.baseDir, 'doc/') }
      },
      env : {path: path.join(this.baseDir, 'config/prod/prod.env')}
    };
    Object.assign(this.webpack, webpackOverride);
    Object.assign(this.paths, pathsOverride);
    this.typedoc = {
      module: 'commonjs',
      target: 'es5',
      includeDeclarations: true,
      excludeExternals: true,
      out: this.paths.doc.out.path,
      hideGenerator: true,
      name: 'App docs'
    };
  }
}
