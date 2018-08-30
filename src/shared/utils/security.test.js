import {
  encrypt,
  md5,
  randomCode,
  sha1
} from './security';

describe('#encrypt', () => {
  it('should return a encrypted salted string', () => {
    expect(encrypt('foo')).toBe('d4e85ff71085daa60a018a8c166bff1ddc1a08c6');
  });
});

describe('#md5', () => {
  it('should return a md5 salted string', () => {
    expect(md5('foo')).toBe('389bee3c368a5b736b1893be39498dd7');
  });
});

describe('#sha1', () => {
  it('should return a sha1 salted string', () => {
    expect(sha1('foo')).toBe('a6041439c9978bf936f04415a4616bee83a56d2f');
  });
});

describe('#randomCode', () => {
  it('should generate a random code of 12 chars', () => {
    expect(randomCode().length).toBe(12);
  });

  it('should generate a random code of X chars', () => {
    expect(randomCode(8).length).toBe(8);
  });
});
