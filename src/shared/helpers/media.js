// Dependencies
import path from 'path';

// Utils
import { glob } from '../utils/files';

/**
 * Returns the media files
 *
 * @returns {object} Media Files
 */
export function getMedia() {
  return glob(path.join(__dirname, '..', '..', '..', 'public', 'media'));
}
