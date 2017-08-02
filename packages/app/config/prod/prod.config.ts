import { BaseConfig } from '../base/base.config';
import * as path from 'path';

export class ProdConfig extends BaseConfig {
	constructor() {
		super();
		const webpackOverride = { watch: false };
		Object.assign(this.webpack, webpackOverride);
	}
}
