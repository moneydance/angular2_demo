import * as fs from 'fs';
import * as path from 'path';
import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import * as HappyPack from 'happypack';
import * as WebpackNotifier from 'webpack-notifier';

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
		const pkg = require(path.join(this.baseDir, 'package.json'));
		this.paths = {
			src: { path: path.join(this.baseDir, 'src/') },
			entry: {
				main: path.join(this.baseDir, 'src/main.ts'),
				vendor: Object.keys(pkg.dependencies)
			},
			ignored: { path: /node_modules/ },
			index: { path: path.join(this.baseDir, 'src/index.html') },
			dist: { path: path.join(this.baseDir, 'dist/') },
			tsconfig: { path: path.join(this.baseDir, 'tsconfig.json') },
			tslint: { path: path.join(this.baseDir, 'config/tslint.json') },
		};
		this.prettier = {
			printWidth: 80,
			tabWidth: 2,
			useTabs: true,
			semi: true,
			singleQuote: true,
			bracketSpacing: true,
			parser: "typescript"
		};
		this.rules = {
			prettier: {
				test: /\.tsx?$/,
				loader: 'prettier-loader',
				enforce: 'pre',
				options: this.prettier,
				exclude: /node_modules/
			},
			tslint: {
				test: /\.ts$/,
				loader: 'tslint-loader',
				enforce: 'pre',
				options: {
					formatter: 'stylish',
					failOnHint: true,
					typeCheck: true,
					tsConfigFile: this.paths.tsconfig.path,
					configFile: this.paths.tslint.path
				},
				exclude: /node_modules/
			},
			ts: {
				test: /\.tsx?$/,
				use: [
					{
						loader: 'happypack/loader',
						options: { id:'ts' }
					},
					'angular2-template-loader',
				],
				exclude: /node_modules/
			},
			happyts: {
				id: 'ts',
				threads: 3,
				loaders: [
					{
						path: 'ts-loader',
						query: {
							happyPackMode: true,
							transpileOnly: true
						}
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
					customAttrSurround: [
						[/#/, /(?:)/], [/\*/, /(?:)/],
						[/\[?\(?/, /(?:)/]
					],
					customAttrAssign: [ /\)?\]?=/ ]
				}
			},
			sass: {
				test: /\.sass$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			}
		};
		this.webpack = {
			entry: this.paths.entry,
			output: {path: this.paths.dist.path, filename: '[name].js'},
			watch: true,
			watchOptions: {
				aggregateTimeout: 0, poll: 300,
				ignored: this.paths.ignored.path
			},
			stats: {
				colors: true, cached: false, chunks: true,
				timings:true
			},
			devtool: 'cheap-module-inline-source-map',
			resolve: {
				modules: [this.paths.src.path, 'node_modules'],
				extensions: ['.json', '.ts', '.tsx', '.js', '.jsx'],
				unsafeCache: true
			},
			module: {
				rules: [
					this.rules.prettier, this.rules.tslint,
					this.rules.ts, this.rules.html, this.rules.sass
				]
			},
			plugins: [
//				new WebpackNotifier(),
				new ForkTsCheckerWebpackPlugin({tsconfig: this.paths.tsconfig.path}),
				new HappyPack(this.rules.happyts),
				new webpack.ContextReplacementPlugin(
					/angular(\\|\/)core(\\|\/)@angular/,
					this.paths.src.path),
				new webpack.optimize.CommonsChunkPlugin({
					name: 'vendor',
					minChunks: module => /node_modules/.test(module.resource)
				}),
				new HtmlWebpackPlugin({template: this.paths.index.path})
			]
		};
	}
}
