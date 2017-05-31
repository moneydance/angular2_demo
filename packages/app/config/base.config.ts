import * as fs from 'fs';
import * as TypedocWebpackPlugin from 'typedoc-webpack-plugin';

export class BaseConfig {
	public constructor() {};
	public get tsconfig():any {
		const tsconfigFilePath = process.env.APP_ROOT + 'tsconfig.json';
		return JSON.parse(fs.readFileSync(tsconfigFilePath, 'utf8'));
	};
	public paths:any = {
		ts: {
			path: 'src/**/*.ts',
		},
		entry: {
			path: ['src/Greeter/Greeter.ts'],
		},
		dist: {
			path: 'dist/',
		},
		doc: {
			path: 'doc/'
		}
	};
	public tslint:any = {
		formatter: 'stylish'
	};
	public rimraf:any = {
		force: true
	};
	public typedoc:any = {
		module: this.tsconfig.module,
		target: this.tsconfig.target,
		includeDeclarations: true,
		excludeExternals: true,
		out: this.paths.doc.path,
		hideGenerator: true,
		name: 'Sidious App docs'
	};
	public webpack:any = {
		watch: true,
		devtool: 'inline-source-map',
		resolve: {
			extensions: ['', '.json', '.ts', '.tsx'],
		},
		/* Documentation https://webpack.github.io/docs/loaders.html#introduction
		 * Please Note that loaders are applied in right to left order (I know really silly).
		 */
		module: {
			loaders: [
				{test: /.tsx?$/, loader: 'angular2-template-loader!awesome-typescript-loader'}
			]
		},
		plugins: [
			new TypedocWebpackPlugin(this.typedoc)
		]
	};
}
