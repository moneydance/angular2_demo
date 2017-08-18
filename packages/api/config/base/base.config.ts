import * as fs from 'fs';
import * as path from 'path';
import * as webpack from 'webpack';
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import * as HappyPack from 'happypack';
import * as nodeExternals from 'webpack-node-externals';

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
			main: {
				path: path.join(this.baseDir, 'src/main.ts'),
			},
			node_modules: {
				path: path.join(this.baseDir, 'node_modules')
			},
			dist: {
				path: path.join(this.baseDir, 'dist/')
			},
			dist_entry: {
				path: path.join(this.baseDir, 'dist/main.js')
			},
			tsconfig: {
				path: path.join(this.baseDir, 'tsconfig.json')
			},
			tslint: {
				path: path.join(this.baseDir, 'config/tslint.json')
			},
		};
		this.ignored = /node_modules/;
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
		};
		this.webpack = {
			entry: { main: [this.paths.main.path] },
			output: {
				path: this.paths.dist.path,
				filename: '[name].js'
			},
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
				modules: [this.paths.src.path, this.paths.node_modules.path],
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
					tsconfig: this.paths.tsconfig.path
				}),
				new HappyPack(this.rules.happyTS),
			]
		};
	}
}
