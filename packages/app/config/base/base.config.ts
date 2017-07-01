import * as fs from 'fs';
import * as path from 'path';
const dir = __dirname;
const tsconfigPath = path.join(dir, "../..", "tsconfig.json");

export class BaseConfig {
  tsconfig:any;
  paths:any;
  tslint:any;
  rimraf:any;
  webpack:any;

  constructor() {
    this.paths = {
		  entry: { path: ['src/Greeter/Greeter.ts'] },
		  dist: { path: 'dist/' },
		  doc: { path: 'doc/' },
      tsconfig: { path: tsconfigPath }
	  };
    this.tsconfig = JSON.parse(fs.readFileSync(this.paths.tsconfig.path, 'utf8'));
    this.tslint = { formatter: 'stylish' };
    this.rimraf = { force: true };
    this.webpack = {
		  watch: true,
		  devtool: 'inline-source-map',
		  resolve: { extensions: ['', '.json', '.ts', '.tsx'] },
		  module: {
			  loaders: [
				  {
            test: /.tsx?$/,
            loader: 'angular2-template-loader!awesome-typescript-loader',
            options: {
              configFileName: this.paths.tsconfig.path
            }
          }
			  ]
		  },
    };
  }
}



