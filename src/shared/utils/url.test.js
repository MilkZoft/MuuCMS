import {
  getCurrentApp,
  getPaginationPageFromParam,
  getParamsFromUrl,
  getValueFromParam,
  getLanguage,
  getLocation,
  getCurrentFrontendApp
} from './url';

global.window = {
  location: {
    href: 'http://localhost:3000/es/blog',
    pathname: '/es/blog'
  }
};

describe('#getCurrentApp', () => {
  it('should return the current app', () => {
    expect(getCurrentApp('/blog')).toBe('blog');
  });

  it('should return the current app passing the language', () => {
    expect(getCurrentApp('en/blog')).toBe('blog');
  });

  it('should return the current app using the dashboard and passing the language', () => {
    expect(getCurrentApp('es/dashboard/blog', true)).toBe('blog');
  });

  it('should return the current app using the dashboard without language', () => {
    expect(getCurrentApp('/dashboard/blog', true)).toBe('blog');
  });
});

describe('#getPaginationPageFromParam', () => {
  it('should return the page number from given params', () => {
    const params = {
      0: '/1',
      action: 'page'
    };

    expect(getPaginationPageFromParam(params)).toBe(1);
  });

  it('should return the page number from given undefined params', () => {
    const params = {
      0: undefined,
      action: undefined
    };

    expect(getPaginationPageFromParam(params)).toBe(0);
  });
});

describe('#getParamsFromUrl', () => {
  it('should return an array of params from given url', () => {
    expect(getParamsFromUrl('/es/blog')).toEqual(['es', 'blog']);
  });
});

describe('#getValueFromParam', () => {
  it('should return the value from given param', () => {
    expect(getValueFromParam('/1')).toBe('1');
  });
});

describe('#getLanguage', () => {
  it('should return the current language', () => {
    expect(getLanguage()).toBe('en');
  });
});

describe('#getLocation', () => {
  it('should return the location value', () => {
    const { pathname } = getLocation();

    expect(pathname).toBe('/');
  });
});

describe('#getCurrentFrontendApp', () => {
  it('should return the current frontend app', () => {
    expect(getCurrentFrontendApp()).toBe('blog');
  });
});
