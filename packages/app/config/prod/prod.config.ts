import { BaseConfig } from '../base/base.config';
import * as path from 'path';

export class ProdConfig extends BaseConfig {
	public typedoc:any;

	constructor() {
		super();
		const webpackOverride = { watch: false };
		const pathsOverride = {
			doc: { path: path.join(this.baseDir, 'doc/') }
		};
		Object.assign(this.webpack, webpackOverride);
		Object.assign(this.paths, pathsOverride);
		this.typedoc = {
			module: 'commonjs',
			target: 'es5',
			includeDeclarations: true,
			excludeExternals: true,
			out: this.paths.src.path,
			hideGenerator: true,
			name: 'App docs'
		};
	}
}
