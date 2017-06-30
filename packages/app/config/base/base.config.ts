import * as fs from 'fs';
import * as path from 'path';
const dir = __dirname;
const tsconfigFilePath = path.join(dir, "../..", "tsconfig.json");

export class BaseConfig {
  tsconfig:any;
  paths:any;
  tslint:any;
  rimraf:any;
  webpack:any;

  constructor() {
    this.tsconfig = JSON.parse(fs.readFileSync(tsconfigFilePath, 'utf8'));
    this.paths = {
		  entry: { path: ['src/Greeter/Greeter.ts'] },
		  dist: { path: 'dist/'},
		  doc: { path: 'doc/'}
	  };
    this.tslint = { formatter: 'stylish' };
    this.rimraf = { force: true };
    this.webpack = {
		  watch: true,
		  devtool: 'inline-source-map',
		  resolve: { extensions: ['', '.json', '.ts', '.tsx'] },
		  module: {
			  loaders: [
				  {test: /.tsx?$/, loader: 'angular2-template-loader!awesome-typescript-loader'}
			  ]
		  },
    };
  }
}



