import {expect} from 'chai';
import {JsonFileIO} from '../';
import path from 'path';

describe('JsonFileIO', () => {
  let file;
  let value;
  before(() => {
    file = path.resolve(__dirname, 'test.json');
    value = {test: 'whatsup'};
  });

  after(() => {
    file = undefined;
  });

  it('reads test file', () => {
    return JsonFileIO.read(file)
      .then((data) =>
        expect(data).to.eql(value)
      );
  });

  it('writes test file', () => {
    return JsonFileIO.write(file, value)
      .then(() =>
        JsonFileIO.read(file)
          .then((data) =>
            expect(data).to.eql(value)
          )
      );
  });
});

