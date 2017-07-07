import * as fs from 'fs';
import * as path from 'path';
import * as webpack from 'webpack';
const dir = __dirname;
const baseDir = path.join(dir, "../..");

export class BaseConfig {
  readonly baseDir:string;
  paths:any;
  rules:any;
  webpack:any;

  constructor() {
    this.baseDir = baseDir;
    this.paths = {
      entry: { path: [path.join(this.baseDir, 'src/Greeter/Greeter.ts')] },
      dist: { path: path.join(this.baseDir, 'dist/') },
      tsconfig: { path: path.join(this.baseDir, 'tsconfig.json') },
      tslint: { path: path.join(this.baseDir, 'config/tslint.json') },
    };
    this.rules = {
		tslint: {
		  test: /\.ts$/,
          loader: 'tslint-loader',
          enforce: 'pre',
          options: {
            formatter: 'stylish',
			failOnHint: true,
			configFile: this.paths.tslint.path
          }
        },
        ts: {
          test: /\.tsx?$/,
          use: [
            'angular2-template-loader',
            {
              loader: 'awesome-typescript-loader',
              options: { configFileName: this.paths.tsconfig.path }
            }
          ]
        },
        html: {
          test: /\.html$/,
          loader: 'html-loader',
          options: {
            minimize: true,
            removeAttributeQuotes: false,
            caseSensitive: true,
            customAttrSurround: [ [/#/, /(?:)/], [/\*/, /(?:)/], [/\[?\(?/, /(?:)/] ],
            customAttrAssign: [ /\)?\]?=/ ]
          }
        },
		sass: {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        }
    };
    this.webpack = {
      watch: true,
      watchOptions: {
        aggregateTimeout: 200,
        poll: 1000,
	  },
      devtool: 'inline-source-map',
      resolve: { extensions: ['.json', '.ts', '.tsx'] },
      module: {
        rules: [this.rules.tslint, this.rules.ts]
      },
    };
  }
}
