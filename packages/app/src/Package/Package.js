import {BaseObj} from 'es6_base';
import {JsonFileIO, YmlFileIO} from '../IO';
import path from 'path';
import Promise from 'bluebird';

const packageFile = 'package.json';
const tempPackageFile = 'packageT.json';
const boxFile = 'box.yml';

 /**
 * Package represents app in projects packages folder
 */
export default class Package extends BaseObj {
  /**
   * Constructor to initialize an object representation of a package
   * @param {string} packageDirPath
   */
  constructor(packageDirPath){
    this.setPrivate('packageDirPath', packageDirPath);
    this.setPrivate('packageFilePath',
      path.resolve(packageDirPath, packageFile));
    this.setPrivate('tempPackageFilePath',
      path.resolve(packageDirPath, tempPackageFile));
    this.setPrivate('boxFilePath',
      path.resolve(packageDirPath, boxFile));
  }

  /**
  * reads package.json data and box.yml data
  * @return {Promise}
  */
  getData() {
    const promises = [
      JsonFileIO.read(this.getPrivate('packageFilePath')),
      YmlFileIO.read(this.getPrivate('boxFilePath'))
    ];
    return Promise.All(promises)
      .then(data => {
        this.packageData = data[0];
        this.boxData = data[1];
        this.name = this.packageData.name;
      });
  }
}
