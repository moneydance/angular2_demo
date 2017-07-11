import * as fs from 'fs';
import * as path from 'path';
import * as webpack from 'webpack';
import * as PrettierPlugin from 'prettier-webpack-plugin';
const dir = __dirname;
const baseDir = path.join(dir, "../..");

export class BaseConfig {
	public readonly baseDir:string;
	public paths:any;
	public prettier: any;
	public rules:any;
	public webpack:any;

	constructor() {
		this.baseDir = baseDir;
		this.paths = {
			entry: { path: [path.join(this.baseDir, 'src/Greeter/Greeter.ts')] },
			dist: { path: path.join(this.baseDir, 'dist/') },
			tsconfig: { path: path.join(this.baseDir, 'tsconfig.json') },
			tslint: { path: path.join(this.baseDir, 'config/tslint.json') }
		};
		this.prettier = {
			printWidth: 80,
			tabWidth: 2,
			useTabs: true,
			semi: true,
			singleQuote: true,
			bracketSpacing: true,
			extensions: ['.ts', '.tsx', '.sass', '.json'],
			parser: "typescript"
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
				use: ['style-loader', 'css-loader', 'sass-loader']
			}
		};
		this.webpack = {
			watch: true,
			watchOptions: { aggregateTimeout: 200, poll: 1000 },
			devtool: 'inline-source-map',
			resolve: { extensions: ['.json', '.ts', '.tsx'] },
			module: {
				rules: [this.rules.tslint, this.rules.ts]
			},
			plugins: [ new PrettierPlugin(this.prettier) ]
		};
	}
}
