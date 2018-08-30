export const REGEX = Object.freeze({
  BLOG: {
    POST: {
      CODES: /(---((.+?):(.+?))([^\n]*?(\n+?))+?---)/g
    }
  },
  ESCAPE: /[-[\]/{}()*+?.\\^$|]/g
});
