import FileIO from './FileIO';

/**
 * Class to read and write Json files
 */
export default class JsonFileIO extends FileIO {
  /**
   * function to read Json file async
   * Returns data wrapped in Promise
   * @param {string} file
   * @return {Promise}
   */
  static read(file) {
    return super.read(file).then((data) =>
      JSON.parse(data)
    );
  }


  /**
   * function to write Object to json file async
   * @param {string} file
   * @param {Object} value
   * @return {Promise}
   */
  static write(file, value) {
    return super.write(file, JSON.stringify(value));
  }
}
