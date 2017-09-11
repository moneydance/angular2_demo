import * as path from 'path';
import { BaseConfig } from './base.config';

export class DevConfig extends BaseConfig {
	constructor() {
		super();
		this.rules.tslint = {
				test: /\.ts$/,
				loader: 'tslint-loader',
				enforce: 'pre',
				options: {
					formatter: 'stylish',
					typeCheck: true,
					emitErrors: true,
					tsConfigFile: this.pathHelper('tsconfig.json'),
					configFile: this.pathHelper('config/tslint.json')
				},
				exclude: this.ignored
		};
		this.webpack.entry = this.pathHelper('src/main.ts');
		this.webpack.module.rules.push(this.rules.tslint);
	}
}
