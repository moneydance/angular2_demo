import * as fs from 'fs';
import * as path from 'path';
const dir = __dirname;
const baseDir = path.join(dir, "../..");

export class BaseConfig {
  readonly baseDir:string;
  paths:any;
  readonly tsconfig:any;
  tslint:any;
  rules:any;
  webpack:any;

  constructor() {
    this.baseDir = baseDir;
    this.paths = {
      entry: { path: [path.join(this.baseDir, 'src/Greeter/Greeter.ts')] },
      dist: { path: path.join(this.baseDir, 'dist/') },
      tsconfig: { path: path.join(this.baseDir, 'tsconfig.json') }
    };
    this.tsconfig = JSON.parse(fs.readFileSync(this.paths.tsconfig.path, 'utf8'));
    this.tslint = {
      extends: "tslint-config-airbnb",
      rules: {
        'no-increment-decrement': false,
        indent: [ true, 'tab' ],
		'ter-indent': [ true, 'tab', { SwitchCase: 1 } ],
		'trailing-comma': [ false ]
      }
    },
    this.rules = {
		tslint: {
		  test: /\.ts$/,
          loader: 'tslint-loader',
          enforce: 'pre',
          options: {
            formatter: 'stylish',
			typeCheck: true,
			tsConfigFile: this.paths.tsconfig.path,
			emitErrors: true,
			failOnHint: true,
            configuration: this.tslint,
			configFile: false
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
      devtool: 'inline-source-map',
      resolve: { extensions: ['.json', '.ts', '.tsx'] },
      module: {
        rules: [this.rules.tslint, this.rules.ts]
      }
    };
  }
}
