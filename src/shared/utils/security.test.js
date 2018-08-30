import {
  encrypt,
  md5,
  randomCode,
  sha1
} from './security';

describe('#encrypt', () => {
  it('should return a encrypted salted string', () => {
    expect(encrypt('foo')).toBe('ef790abbe1e8f4ddc8bb8fe1af981dfcea7c3ef1');
  });
});

describe('#md5', () => {
  it('should return a md5 salted string', () => {
    expect(md5('foo')).toBe('9430b7d0907b1e21d2650449f82be194');
  });
});

describe('#sha1', () => {
  it('should return a sha1 salted string', () => {
    expect(sha1('foo')).toBe('8e20506af80e03ab393d93d078fb950355c93bb8');
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
