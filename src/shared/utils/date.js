const moment = require('moment');

/**
 * Returns current day in 'dd' format
 *
 * @returns {string} Current day in 'dd' format
 */
export function getDay(specificDate, format = 'dd') {
  const date = specificDate || new Date();
  const day = date.getDate();

  if (day > 0) {
    return format === 'dd' && day < 10 ? `0${day}` : day.toString();
  }

  return false;
}

/**
 * Returns current day in 'MM' format
 *
 * @returns {string} Current month in 'MM' format
 */
export function getMonth(specificDate) {
  const date = specificDate || new Date();
  const month = date.getMonth() + 1;

  return month < 10 ? `0${month}` : month.toString();
}

/**
 * Returns current year in 'yyyy' format
 *
 * @returns {string} Current year in 'yyyy' format
 */
export function getYear(specificDate, format = 'yyyy') {
  const date = specificDate || new Date();
  const year = date.getFullYear();

  return format === 'yyyy' ? year.toString() : year.toString().substr(-2);
}

/**
 * Return the key of the month according to the month number
 *
 * @param {integer} month month number
 * @returns {string} string
 */
export function getMonthContentKey(month) {
  const keysList = [
    'Lib.Utils.Date.Months.jan',
    'Lib.Utils.Date.Months.feb',
    'Lib.Utils.Date.Months.mar',
    'Lib.Utils.Date.Months.apr',
    'Lib.Utils.Date.Months.may',
    'Lib.Utils.Date.Months.jun',
    'Lib.Utils.Date.Months.jul',
    'Lib.Utils.Date.Months.aug',
    'Lib.Utils.Date.Months.sep',
    'Lib.Utils.Date.Months.oct',
    'Lib.Utils.Date.Months.nov',
    'Lib.Utils.Date.Months.dec'
  ];

  const monthKey = keysList[parseInt(month, 10) - 1] ? keysList[parseInt(month, 10) - 1] : '';

  return monthKey;
}

export function now() {
  return `${getMonth()}/${getDay()}/${getYear()}`;
}

export const currentDateAndTime = () => moment(new Date(), 'America/Mexico_City').format('YYYY-MM-DD HH:mm:ss');

export const currentHour = () => moment(new Date(), 'America/Mexico_City').format('HH');
