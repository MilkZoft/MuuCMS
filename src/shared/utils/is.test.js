import {
  isArray,
  isDefined,
  isEmail,
  isFunction,
  isJson,
  isLanguage,
  isNumber,
  isObject,
  isPassword,
  isString,
  isUndefined
} from './is';

describe('#isArray', () => {
  it('should return true if is an Array', () => {
    expect(isArray([1, 2, 3])).toBe(true);
  });

  it('should return false if is not an Array', () => {
    expect(isArray({
      bar: 'bar',
      foo: 'foo'
    })).toBe(false);
  });
});

describe('#isDefined', () => {
  it('should return true if a variable is defined', () => {
    const test = 'Foo';
    expect(isDefined(test)).toBe(true);
  });

  it('should return false if a variable is undefined', () => {
    let test;
    expect(isDefined(test)).toBe(false);
  });
});

describe('#isEmail', () => {
  it('should be true if a variable is an email', () => {
    expect(isEmail('foo@bar.com')).toBe(true);
  });

  it('should be false if a variable is not an email', () => {
    expect(isEmail('foobar.com')).toBe(false);
  });
});

describe('#isFunction', () => {
  it('should be true if a variable is a function', () => {
    const test = () => 'bar';
    expect(isFunction(test)).toBe(true);
  });

  it('should be false if a variable is not a function', () => {
    const test = 'bar';
    expect(isFunction(test)).toBe(false);
  });
});

describe('#isJson', () => {
  it('should be true if a variable is a valid json', () => {
    const test = JSON.stringify({
      foo: {
        bar: true
      }
    });

    expect(isJson(test)).toBe(true);
  });

  it('should be false if a variable is not a valid json', () => {
    expect(isJson(null)).toBe(false);
    expect(isJson('bar')).toBe(false);
  });
});

describe('#isLanguage', () => {
  it('should be true if a variable is a valid language', () => {
    expect(isLanguage('en')).toBe(true);
    expect(isLanguage('es')).toBe(true);
  });

  it('should be false if a variable is not a valid language', () => {
    expect(isLanguage('enn')).toBe(false);
    expect(isLanguage('ch')).toBe(false);
    expect(isLanguage('jp')).toBe(false);
  });
});

describe('#isNumber', () => {
  it('should be true if a variable is a number', () => {
    expect(isNumber(-1)).toBe(true);
    expect(isNumber(0)).toBe(true);
    expect(isNumber(1)).toBe(true);
  });

  it('should be false if a variable is not a number', () => {
    expect(isNumber(true)).toBe(false);
    expect(isNumber(false)).toBe(false);
    expect(isNumber('O')).toBe(false);
  });
});

describe('#isObject', () => {
  it('should return true if a variable is object', () => {
    const test = {
      foo: 'Foo'
    };

    expect(isObject(test)).toBe(true);
  });

  it('should return false if a variable is not an object', () => {
    const test = ['Foo'];
    expect(isObject(test)).toBe(false);
  });
});

describe('#isPassword', () => {
  it('should be true if a value is a valid password', () => {
    expect(isPassword('12345678')).toBe(true);
  });

  it('should be true if a value is not a valid password', () => {
    expect(isPassword('12345')).toBe(false);
  });
});

describe('#isString', () => {
  it('should be true if a variable is a string', () => {
    expect(isString('foo')).toBe(true);
    expect(isString('123')).toBe(true);
    expect(isString('true')).toBe(true);
  });

  it('should be false if a variable is not a string', () => {
    expect(isString(true)).toBe(false);
    expect(isString(false)).toBe(false);
    expect(isString(0)).toBe(false);
    expect(isString(1)).toBe(false);
  });
});

describe('#isUndefined', () => {
  it('should return true if a variable is undefined', () => {
    let test;
    expect(isUndefined(test)).toBe(true);
  });

  it('should return false if a variable is not undefined', () => {
    const test = 'foo';
    expect(isUndefined(test)).toBe(false);
  });
});
