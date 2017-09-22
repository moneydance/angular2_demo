import * as path from 'path';
import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import * as HappyPack from 'happypack';
import * as yargs from 'yargs';
import { cloneDeep } from 'lodash';

const dir = __dirname;
const baseDir = path.join(dir, '../');

export abstract class BaseConfig {
	public readonly baseDir: string;
	public ignored: any;
	public rules: any;
	public webpack: any;

	constructor() {
		this.baseDir = baseDir;
		const sass: any = {
			test: /\.scss$/,
			use: [
				'css-loader',
				{
					loader: 'resolve-url-loader',
					options: {
						root: this.pathHelper('src'),
						includeRoot: true,
						sourceMap: true
					}
				},
				{
					loader: 'sass-loader',
					options: {
						includePaths: [
							this.pathHelper('node_modules')
						],
						sourceMap: true
					}
				}
			]
		};
		// styles are loaded globally in html script tag
		const sassGlobal: any = cloneDeep(sass);
		sassGlobal.include = this.pathHelper('src/assets');
		sassGlobal.use.unshift('style-loader');
		// styles must be loaded as strings in angular templates
		const sassAngular: any = cloneDeep(sass);
		sassAngular.exclude = this.pathHelper('src/assets');
		sassAngular.use.unshift('to-string-loader');
		this.rules = {
			sassGlobal,
			sassAngular,
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
				exclude: /node_modules/
			},
			happyTS: {
				id: 'ts',
				threads: 2,
				loaders: [{
					path: 'ts-loader',
					query: {
						happyPackMode: true,
					}
				}],
			},
			html: {
				test: /\.html$/,
				loader: 'raw-loader',
			},
			base64Inline: {
				test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
				use: 'base64-inline-loader'
			}
		};

		this.webpack = {
			watch: yargs.argv.watch,
			output: {
				path: this.pathHelper('dist'),
				filename: '[name].js'
			},
			watchOptions: {
				ignored: /node_modules/,
				poll:300
			},
			stats: {
				assets: false, colors: true, version: false,
				hash: false, timings: false, chunks: false,
				chunkModules: false
			},
			devtool: 'inline-source-map',
			resolve: {
				modules: [this.pathHelper('src'), 'node_modules'],
				extensions: [
					'.json', '.ts', '.tsx',
					'.js', '.jsx', '.scss', 'css'
				],
			},
			module: {
				rules: [
					this.rules.ts,
					this.rules.html, this.rules.sassAngular,
					this.rules.sassGlobal, this.rules.base64Inline
				]
			},
			plugins: [
				// related to this issue https://github.com/angular/angular/issues/11580
				new webpack.ContextReplacementPlugin(
					/angular(\\|\/)core(\\|\/)@angular/,
					path.resolve(__dirname, this.pathHelper('src'))
				),
    			new ForkTsCheckerWebpackPlugin({ tsconfig:this.pathHelper('tsconfig.json') }),
				new HappyPack(this.rules.happyTS),
				new webpack.optimize.CommonsChunkPlugin({
					name: 'vendor',
					minChunks: module => /node_modules/.test(module.resource),
					Infinity
				}),
				new HtmlWebpackPlugin({
					template: this.pathHelper('src/index.html')
				})
			]
		};
	}

	public pathHelper(leaf: string) {
		return path.join(this.baseDir, leaf);
	}
}
