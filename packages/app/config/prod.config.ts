import * as path from 'path';
import { BaseConfig } from './base.config';

export class ProdConfig extends BaseConfig {
	constructor() {
		super();
		this.webpack.entry = this.pathHelper('src/main.ts');
	}
}
