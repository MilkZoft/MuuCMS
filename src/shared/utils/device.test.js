import {
  getCurrentDevice,
  isBot,
  isDesktop,
  isMobile
} from './device';

const botUA = `
  Mozilla/5.0
  (compatible; Googlebot/2.1; +http://www.google.com/bot.html)`;

const desktopUA = `
  UA Mozilla/5.0
  (Macintosh; Intel Mac OS X 10_11_5)
  AppleWebKit/537.36 (KHTML, like Gecko)
  Chrome/52.0.2743.82 Safari/537.36`;

const mobileUA = `
  UA Mozilla/5.0
  (iPhone; CPU iPhone OS 9_3 like Mac OS X)
  AppleWebKit/601.1.46
  (KHTML, like Gecko)
  Version/9.0
  Mobile/13E230
  Safari/601.1`;

describe('#getCurrentDevice', () => {
  it('should return "desktop" if is a Desktop device', () => {
    expect(getCurrentDevice(desktopUA)).toBe('desktop');
  });

  it('should return "mobile" if is a Mobile device', () => {
    expect(getCurrentDevice(mobileUA)).toBe('mobile');
  });
});

describe('#isBot', () => {
  it('should return true if is Bot', () => {
    expect(isBot(botUA)).toBe(true);
  });

  it('should return false if is not a Bot', () => {
    expect(isBot(mobileUA)).toBe(false);
  });
});

describe('#isDesktop', () => {
  it('should return true if is Desktop', () => {
    expect(isDesktop(desktopUA)).toBe(true);
  });

  it('should return false if is not Desktop', () => {
    expect(isDesktop(mobileUA)).toBe(false);
  });
});

describe('#isMobile', () => {
  it('should return true if is Mobile', () => {
    expect(isMobile(mobileUA)).toBe(true);
  });

  it('should return false if is not Mobile', () => {
    expect(isMobile(desktopUA)).toBe(false);
  });
});
