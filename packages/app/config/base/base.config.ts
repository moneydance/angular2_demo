import * as fs from 'fs';
import * as path from 'path';
const dir = __dirname;
const baseDir = path.join(dir, "../..");

export class BaseConfig {
  tsconfig:any;
  paths:any;
  tslint:any;
  rimraf:any;
  webpack:any;
  baseDir:string;

  constructor() {
    this.baseDir = baseDir;
    this.paths = {
      entry: { path: [path.join(this.baseDir, 'src/Greeter/Greeter.ts')] },
      dist: { path: path.join(this.baseDir, 'dist/*') },
      doc: { path: path.join(this.baseDir, 'src/') },
      tsconfig: { path: path.join(this.baseDir, 'tsconfig.json') }
    };
    this.tsconfig = JSON.parse(fs.readFileSync(this.paths.tsconfig.path, 'utf8'));
    this.tslint = { formatter: 'stylish' };
    this.rimraf = { force: true };
    this.webpack = {
      context: this.baseDir,
      watch: true,
      devtool: 'inline-source-map',
      resolve: { extensions: ['', '.json', '.ts', '.tsx'] },
      module: {
        loaders: [
          {
            test: /\.tsx?$/,
            loader: 'angular2-template-loader!awesome-typescript-loader',
            options: { configFileName: this.paths.tsconfig.path }
          },
          {
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
          {
            test: /\.scss$/,
            loader: 'style-loader!css-loader!sass-loader',
          },
        ]
      },
    };
  }
}
