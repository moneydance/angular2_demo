import FileIO from './FileIO';
import YAML from 'yamljs';
/**
 * Class to read and write YAML files
 */
export default class YmlFileIO extends FileIO {
  /**
   * function to read YAML file async
   * Returns data wrapped in Promise
   * @param {string} file
   * @return {Promise}
   */
  static read(file) {
    return super.read(file).then((data) =>
      YAML.parse(data)
    );
  }


  /**
   * function to write Object to YAML file async
   * @param {string} file
   * @param {Object} value
   * @return {Promise}
   */
  static write(file, value) {
    return super.write(file, YAML.stringify(value));
  }
}

