import {expect} from 'chai';
import {FileIO} from '../';
import path from 'path';

describe('FileIO', () => {
  let file;
  let value;
  before(() => {
    file = path.resolve(__dirname, 'test.txt');
    value = 'whatsup\n';
  });

  after(() => {
    file = undefined;
  });

  it('reads test file', () => {
    return FileIO.read(file)
      .then((data) =>
        expect(data).to.equal(value)
      );
  });

  it('writes test file', () => {
    return FileIO.write(file, value)
      .then(() =>
        FileIO.read(file)
          .then((data) =>
            expect(data).to.equal(value)
          )
      );
  });
});
