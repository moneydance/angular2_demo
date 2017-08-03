import * as fs from 'fs';
import * as path from 'path';
import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import * as HappyPack from 'happypack';
import { merge } from 'lodash';

const dir = __dirname;
const baseDir = path.join(dir, "../..");

export class BaseConfig {
	public readonly baseDir: string;
	public paths: any;
	public ignored: any;
	public rules: any;
	public webpack: any;

	constructor() {
		this.baseDir = baseDir;
		this.paths = {
			src: {
				path: path.join(this.baseDir, 'src/')
			},
			assets: {
				path: path.join(this.baseDir, 'src/assets/')
			},
			main: {
				path: path.join(this.baseDir, 'src/main.ts'),
			},
			node_modules: {
				path: path.join(this.baseDir, 'node_modules')
			},
			index: {
				path: path.join(this.baseDir, 'src/index.html')
			},
			dist: {
				path: path.join(this.baseDir, 'dist/')
			},
			tsconfig: {
				path: path.join(this.baseDir, 'tsconfig.json')
			},
			tslint: {
				path: path.join(this.baseDir, 'config/tslint.json')
			},
		};
		this.ignored = /node_modules/;
		const sass: any = {
			test: /\.scss$/,
			use: [
				'css-loader',
				{
					loader: 'resolve-url-loader',
					options: {
						root: this.paths.src.path,
						includeRoot: true,
						sourceMap: true
					}
				},
				{
					loader: 'sass-loader',
					options: {
						includePaths: [
							this.paths.node_modules.path,
						],
						sourceMap: true
					}
				}
			]
		};
		// https://stackoverflow.com/questions/40454094/load-some-css-with-style-loader-and-some-css-with-to-string-loader-in-webpack-2
		// styles are loaded globally in html script tag
		const sassGlobalOverride: any = { include: this.paths.assets.path };
		const sassGlobal: any = merge(sassGlobalOverride, sass);
		sassGlobal.use.unshift('style-loader');
		// styles must be loaded as strings in angular templates
		const sassAngularOverride: any = { exclude: this.paths.assets.path };
		const sassAngular: any = merge(sassAngularOverride, sass);
		sassAngular.use.unshift('to-string-loader');
		this.rules = {
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
				exclude: this.ignored
			},
			ts: {
				test: /\.tsx?$/,
				use: [
					{
						loader: 'happypack/loader',
						options: {
							id: 'ts'
						}
					},
					'angular2-template-loader',
				],
				exclude: this.ignored
			},
			happyTS: {
				id: 'ts',
				threads: 3,
				loaders: [{
					path: 'ts-loader',
					query: {
						happyPackMode: true,
						transpileOnly: true
					}
				}],
			},
			html: {
				test: /\.html$/,
				loader: 'raw-loader',
			},
			sassGlobal: sassGlobal,
			sassAngular: sassAngular,
			base64Inline: {
				test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
				use: 'base64-inline-loader'
			},
		};
		this.webpack = {
			entry: { main: this.paths.main.path },
			output: {
				path: this.paths.dist.path,
				filename: '[name].js'
			},
			watch: true,
			watchOptions: {
				aggregateTimeout: 0,
				poll: 300,
				ignored: this.ignored
			},
			stats: {
				colors: true,
				cached: false,
				chunks: true,
				timings: true
			},
			devtool: 'cheap-module-inline-source-map',
			resolve: {
				modules: [this.paths.src.path, 'node_modules'],
				extensions: [
					'.json', '.ts', '.tsx',
					'.js', '.jsx', '.scss', 'css'
				],
			},
			module: {
				rules: [
					this.rules.tslint, this.rules.ts,
					this.rules.html, this.rules.sassAngular,
					this.rules.sassGlobal, this.rules.base64Inline
				]
			},
			plugins: [
				new webpack.ContextReplacementPlugin(                                  // related to this issue https://github.com/angular/angular/issues/11580
					/angular(\\|\/)core(\\|\/)@angular/,
					path.resolve(__dirname, this.paths.src.path)
				),
				new ForkTsCheckerWebpackPlugin({
					tsconfig: this.paths.tsconfig.path
				}),
				new HappyPack(this.rules.happyTS),
				new webpack.optimize.CommonsChunkPlugin({
					name: 'vendor',
					minChunks: module => /node_modules/.test(module.resource)
				}),
				new HtmlWebpackPlugin({
					template: this.paths.index.path
				})
			]
		};
	}
}
