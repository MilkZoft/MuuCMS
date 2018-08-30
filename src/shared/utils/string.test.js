import {
  addSlashes,
  camelCase,
  clean,
  escapeString,
  removeHTML,
  sanitize
} from './string';

describe('#addSlashes', () => {
  it('should return a string with slashes', () => {
    expect(addSlashes('This is a "test"')).toBe('This is a \"test\"'); // eslint-disable-line
  });

  it('should return the same value if is not a string', () => {
    expect(addSlashes(true)).toBe(true);
    expect(addSlashes(false)).toBe(false);
    expect(addSlashes(0)).toBe(0);
    expect(addSlashes(1)).toBe(1);
  });
});

describe('#camelCase', () => {
  it('should return a string with camelCase', () => {
    expect(camelCase('foo_bar')).toBe('fooBar');
  });
});

describe('#clean', () => {
  it('should remove special characters in a string', () => {
    expect(clean('{&Foo&}')).toBe('Foo');
  });
});

describe('#escapeString', () => {
  it('should escape a string', () => {
    expect(escapeString('<p>Foo</p>')).toBe('&lt;p&gt;Foo&lt;/p&gt;');
  });
});

describe('#removeHTML', () => {
  it('should remove the HTML in a string', () => {
    expect(removeHTML('<p>Foo</p>')).toBe('Foo');
  });
});

describe('#sanitize', () => {
  it('should sanitize a string', () => {
    expect(sanitize("OR '1'='1")).toBe('OR 11');
  });

  it('should sanitize an object', () => {
    const query = {
      foo: "OR '1'='1",
      bar: "OR '1'='1"
    };

    const expected = {
      foo: 'OR 11',
      bar: 'OR 11'
    };

    expect(sanitize(query)).toEqual(expected);
  });

  it('should return false when trying to sanitize a non string', () => {
    expect(sanitize(true)).toBe(false);
  });
});
