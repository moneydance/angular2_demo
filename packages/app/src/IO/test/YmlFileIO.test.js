import {expect} from 'chai';
import {YmlFileIO} from '../';
import path from 'path';

describe('YmlFileIO', () => {
  let file;
  let value;
  before(() => {
    file = path.resolve(__dirname, 'test.yml');
    value = {test: 'whatsup'};
  });

  after(() => {
    file = undefined;
  });

  it('reads test file', () => {
    return YmlFileIO.read(file)
      .then((data) =>
        expect(data).to.eql(value)
      );
  });

  it('writes test file', () => {
    return YmlFileIO.write(file, value)
      .then(() =>
        YmlFileIO.read(file)
          .then((data) =>
            expect(data).to.eql(value)
          )
      );
  });
});


