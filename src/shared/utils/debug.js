// Configuration
import { $app } from '@configuration';

/**
 * @TODO Add a Unit Test
 * Debug for development
 *
 * @param {*} value Value
 * @returns {void} Console.log
 */
export function debug(...args) {
  const colors = {
    cyan: '\x1b[36m',
    yellow: '\x1b[33m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    magenta: '\x1b[35m'
  };

  if ($app().debug) {
    /* eslint no-console: 0 */
    console.log(
      colors.green,
      '==========================================',
      '\n Debugging: \n\n',
      JSON.stringify(args.filter(e => e)),
      '\n =========================================='
    );
  }
}
