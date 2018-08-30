import {
  getDay,
  getMonth,
  getMonthContentKey,
  getYear
} from './date';

describe('getDay', () => {
  it('should get the current day with format "dd"', () => {
    expect(getDay(new Date('Jan 1 2017'))).toEqual('01');
    expect(getDay(new Date('Jan 2 2017'))).toEqual('02');
    expect(getDay(new Date('Jan 3 2017'))).toEqual('03');
    expect(getDay(new Date('Jan 4 2017'))).toEqual('04');
    expect(getDay(new Date('Jan 5 2017'))).toEqual('05');
    expect(getDay(new Date('Jan 6 2017'))).toEqual('06');
    expect(getDay(new Date('Jan 7 2017'))).toEqual('07');
    expect(getDay(new Date('Jan 8 2017'))).toEqual('08');
    expect(getDay(new Date('Jan 9 2017'))).toEqual('09');
    expect(getDay(new Date('Jan 10 2017'))).toEqual('10');
    expect(getDay(new Date('Jan 11 2017'))).toEqual('11');
    expect(getDay(new Date('Jan 12 2017'))).toEqual('12');
    expect(getDay(new Date('Jan 13 2017'))).toEqual('13');
    expect(getDay(new Date('Jan 14 2017'))).toEqual('14');
    expect(getDay(new Date('Jan 15 2017'))).toEqual('15');
    expect(getDay(new Date('Jan 16 2017'))).toEqual('16');
    expect(getDay(new Date('Jan 17 2017'))).toEqual('17');
    expect(getDay(new Date('Jan 18 2017'))).toEqual('18');
    expect(getDay(new Date('Jan 19 2017'))).toEqual('19');
    expect(getDay(new Date('Jan 20 2017'))).toEqual('20');
    expect(getDay(new Date('Jan 21 2017'))).toEqual('21');
    expect(getDay(new Date('Jan 22 2017'))).toEqual('22');
    expect(getDay(new Date('Jan 23 2017'))).toEqual('23');
    expect(getDay(new Date('Jan 24 2017'))).toEqual('24');
    expect(getDay(new Date('Jan 25 2017'))).toEqual('25');
    expect(getDay(new Date('Jan 26 2017'))).toEqual('26');
    expect(getDay(new Date('Jan 27 2017'))).toEqual('27');
    expect(getDay(new Date('Jan 28 2017'))).toEqual('28');
    expect(getDay(new Date('Jan 29 2017'))).toEqual('29');
    expect(getDay(new Date('Jan 30 2017'))).toEqual('30');
    expect(getDay(new Date('Jan 31 2017'))).toEqual('31');
    expect(getDay(new Date('Jan 32 2017'))).toEqual(false);
  });

  it('should get the current day with format "d"', () => {
    expect(getDay(new Date('Jan 1 2017'), 'd')).toEqual('1');
    expect(getDay(new Date('Jan 2 2017'), 'd')).toEqual('2');
    expect(getDay(new Date('Jan 3 2017'), 'd')).toEqual('3');
    expect(getDay(new Date('Jan 4 2017'), 'd')).toEqual('4');
    expect(getDay(new Date('Jan 5 2017'), 'd')).toEqual('5');
    expect(getDay(new Date('Jan 6 2017'), 'd')).toEqual('6');
    expect(getDay(new Date('Jan 7 2017'), 'd')).toEqual('7');
    expect(getDay(new Date('Jan 8 2017'), 'd')).toEqual('8');
    expect(getDay(new Date('Jan 9 2017'), 'd')).toEqual('9');
    expect(getDay(new Date('Jan 10 2017'), 'd')).toEqual('10');
    expect(getDay(new Date('Jan 11 2017'), 'd')).toEqual('11');
    expect(getDay(new Date('Jan 12 2017'), 'd')).toEqual('12');
    expect(getDay(new Date('Jan 13 2017'), 'd')).toEqual('13');
    expect(getDay(new Date('Jan 14 2017'), 'd')).toEqual('14');
    expect(getDay(new Date('Jan 15 2017'), 'd')).toEqual('15');
    expect(getDay(new Date('Jan 16 2017'), 'd')).toEqual('16');
    expect(getDay(new Date('Jan 17 2017'), 'd')).toEqual('17');
    expect(getDay(new Date('Jan 18 2017'), 'd')).toEqual('18');
    expect(getDay(new Date('Jan 19 2017'), 'd')).toEqual('19');
    expect(getDay(new Date('Jan 20 2017'), 'd')).toEqual('20');
    expect(getDay(new Date('Jan 21 2017'), 'd')).toEqual('21');
    expect(getDay(new Date('Jan 22 2017'), 'd')).toEqual('22');
    expect(getDay(new Date('Jan 23 2017'), 'd')).toEqual('23');
    expect(getDay(new Date('Jan 24 2017'), 'd')).toEqual('24');
    expect(getDay(new Date('Jan 25 2017'), 'd')).toEqual('25');
    expect(getDay(new Date('Jan 26 2017'), 'd')).toEqual('26');
    expect(getDay(new Date('Jan 27 2017'), 'd')).toEqual('27');
    expect(getDay(new Date('Jan 28 2017'), 'd')).toEqual('28');
    expect(getDay(new Date('Jan 29 2017'), 'd')).toEqual('29');
    expect(getDay(new Date('Jan 30 2017'), 'd')).toEqual('30');
    expect(getDay(new Date('Jan 31 2017'), 'd')).toEqual('31');
    expect(getDay(new Date('Jan 32 2017'), 'd')).toEqual(false);
  });
});

describe('getMonth', () => {
  it('should get the current month', () => {
    expect(getMonth(new Date('Jan 1 2017'))).toEqual('01');
    expect(getMonth(new Date('Feb 1 2017'))).toEqual('02');
    expect(getMonth(new Date('Mar 1 2017'))).toEqual('03');
    expect(getMonth(new Date('Apr 1 2017'))).toEqual('04');
    expect(getMonth(new Date('May 1 2017'))).toEqual('05');
    expect(getMonth(new Date('Jun 1 2017'))).toEqual('06');
    expect(getMonth(new Date('Jul 1 2017'))).toEqual('07');
    expect(getMonth(new Date('Aug 1 2017'))).toEqual('08');
    expect(getMonth(new Date('Sep 1 2017'))).toEqual('09');
    expect(getMonth(new Date('Oct 1 2017'))).toEqual('10');
    expect(getMonth(new Date('Nov 1 2017'))).toEqual('11');
    expect(getMonth(new Date('Dec 1 2017'))).toEqual('12');
  });
});

describe('getMonthContentKey', () => {
  it('should get the correct month key given the month number', () => {
    expect(getMonthContentKey('01')).toEqual('Lib.Utils.Date.Months.jan');
    expect(getMonthContentKey('02')).toEqual('Lib.Utils.Date.Months.feb');
    expect(getMonthContentKey('03')).toEqual('Lib.Utils.Date.Months.mar');
    expect(getMonthContentKey('04')).toEqual('Lib.Utils.Date.Months.apr');
    expect(getMonthContentKey('05')).toEqual('Lib.Utils.Date.Months.may');
    expect(getMonthContentKey('06')).toEqual('Lib.Utils.Date.Months.jun');
    expect(getMonthContentKey('07')).toEqual('Lib.Utils.Date.Months.jul');
    expect(getMonthContentKey('08')).toEqual('Lib.Utils.Date.Months.aug');
    expect(getMonthContentKey('09')).toEqual('Lib.Utils.Date.Months.sep');
    expect(getMonthContentKey('10')).toEqual('Lib.Utils.Date.Months.oct');
    expect(getMonthContentKey('11')).toEqual('Lib.Utils.Date.Months.nov');
    expect(getMonthContentKey('12')).toEqual('Lib.Utils.Date.Months.dec');
  });
});

describe('getYear', () => {
  it('should get the current year with format "yyyy"', () => {
    expect(getYear(new Date('Jan 1 1999'))).toEqual('1999');
    expect(getYear(new Date('Jan 1 2000'))).toEqual('2000');
    expect(getYear(new Date('Jan 1 2001'))).toEqual('2001');
    expect(getYear(new Date('Jan 1 2002'))).toEqual('2002');
    expect(getYear(new Date('Jan 1 2003'))).toEqual('2003');
    expect(getYear(new Date('Jan 1 2004'))).toEqual('2004');
    expect(getYear(new Date('Jan 1 2005'))).toEqual('2005');
    expect(getYear(new Date('Jan 1 2010'))).toEqual('2010');
    expect(getYear(new Date('Jan 1 2020'))).toEqual('2020');
    expect(getYear(new Date('Jan 1 2050'))).toEqual('2050');
    expect(getYear(new Date('Jan 1 2100'))).toEqual('2100');
  });

  it('should get the current year with format "yy"', () => {
    expect(getYear(new Date('Jan 1 1999'), 'yy')).toEqual('99');
    expect(getYear(new Date('Jan 1 2000'), 'yy')).toEqual('00');
    expect(getYear(new Date('Jan 1 2001'), 'yy')).toEqual('01');
    expect(getYear(new Date('Jan 1 2002'), 'yy')).toEqual('02');
    expect(getYear(new Date('Jan 1 2003'), 'yy')).toEqual('03');
    expect(getYear(new Date('Jan 1 2004'), 'yy')).toEqual('04');
    expect(getYear(new Date('Jan 1 2005'), 'yy')).toEqual('05');
    expect(getYear(new Date('Jan 1 2010'), 'yy')).toEqual('10');
    expect(getYear(new Date('Jan 1 2020'), 'yy')).toEqual('20');
    expect(getYear(new Date('Jan 1 2050'), 'yy')).toEqual('50');
    expect(getYear(new Date('Jan 1 2100'), 'yy')).toEqual('00');
  });
});
