import * as fs from 'fs';
import * as path from 'path';
import * as webpack from 'webpack';
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import * as HappyPack from 'happypack';
import * as nodeExternals from 'webpack-node-externals';
import * as yargs from 'yargs';

const dir = __dirname;
const baseDir = path.join(dir, "../");

export class BaseConfig {
	public readonly baseDir: string;
	public paths: any;
	public ignored: any;
	public rules: any;
	public webpack: any;

	constructor() {
		this.baseDir = baseDir;
		this.rules = {
			tslint: {
				test: /\.ts$/,
				loader: 'tslint-loader',
				enforce: 'pre',
				options: {
					formatter: 'stylish',
					emitErrors: true,
					typeCheck: true,
					tsConfigFile: this.pathHelper('tsconfig.json'),
					configFile: this.pathHelper('config/tslint.json')
				},
				exclude: /node_modules/
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
						transpileOnly: true
					}
				}],
			},
		};
		this.webpack = {
			watch: yargs.argv.watch,
			entry: { server: this.pathHelper('src/server.ts') },
			output: {
				path: this.pathHelper('dist/'),
				filename: '[name].js'
			},
			watchOptions: {
				ignored: /node_modules/,
				poll: 300,
			},
			stats: {
				colors: true,
				cached: false,
				timings: true
			},
			devtool: 'cheap-module-inline-source-map',
			resolve: {
				modules: [this.pathHelper('src/'), this.pathHelper('node_modules/')],
				extensions: [
					'.json', '.ts', '.tsx',
					'.js', '.jsx'
				],
			},
			externals: [nodeExternals()],
			module: {
				rules: [
					this.rules.tslint, this.rules.ts,
				]
			},
			plugins: [
				new ForkTsCheckerWebpackPlugin({
					tsconfig: this.pathHelper('tsconfig.json')
				}),
				new HappyPack(this.rules.happyTS),
			]
		};
	}
	public pathHelper(leaf: string) {
		return path.join(this.baseDir, leaf);
	}
}
