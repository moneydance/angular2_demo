import { BaseConfig } from '../base/base.config';

export class ProdConfig extends BaseConfig {
  typedoc:any;

  constructor() {
    super();
    this.typedoc = {
      module: this.tsconfig.compilerOptions.module,
      target: this.tsconfig.compilerOptions.target,
      includeDeclarations: true,
      excludeExternals: true,
      out: this.paths.doc.path,
      hideGenerator: true,
      name: 'App docs'
    };
    const webpackOverride = { watch: false };
    Object.assign(this.webpack, webpackOverride);
  }
}
