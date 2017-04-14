import {BaseObj} from 'es6_base';
import Promise from 'bluebird';
import path from 'path';
import fs from 'fs';

// Support async fs functions via promises
Promise.promisifyAll(fs);

/**
 * baseclass to read and write files
 */
export default class FileIO extends BaseObj {
  /**
   * function to read file async
   * Returns data wrapped in Promise
   * @param {string} file
   * @return {Promise}
   */
  static read(file) {
    return fs.readFileAsync(file, 'utf8')
      .then((data, err) => {
        if (err) {
          console.log('Couldn\'t read file');
          throw {'file': file, 'error': err};
        }
        return data;
      });
  }
  /**
   * function to write file async
   * @param {string} file
   * @param {string} value
   * @return {Promise}
   */
  static write(file, value) {
    return fs.writeFileAsync(file, value)
      .then((err) => {
        if (err) {
          console.log('Couldn\'t write file');
          throw {'file': file, 'error': err};
        }
      });
  }
}
