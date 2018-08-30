// Dependencies
import fs from 'fs';
import path from 'path';

// Configuration
import { $baseUrl } from '@configuration';

// Utils
import { isDefined } from './is';

/**
 * Returns the file extension
 *
 * @param {string} file Filename
 * @returns {string} Extension
 */
export function getFileExtension(file) {
  return file.split('.').pop();
}

/**
 * Returns an object with the file formats
 *
 * @returns {object} File Formats
 */
export function getFileFormats() {
  return {
    pdf: 'pdf',
    docx: 'word',
    js: 'code',
    json: 'code',
    mp4: 'video',
    rar: 'zip',
    sql: 'code',
    zip: 'zip'
  };
}

/**
 * Returns the filename & extension
 *
 * @param {string} file Filename
 * @returns {object} File info (name & extension)
 */
export function getFileInfo(file) {
  const filename = file.split('/').pop();
  const parts = filename.split('.');

  return {
    name: parts[0],
    extension: parts[1]
  };
}

/**
 * Returns the file size
 *
 * @param {string} file Filename
 * @returns {string} File size
 */
export function getFileSize(file) {
  const dir = path.join(__dirname, `../../../public/${file}`);
  const stats = fs.statSync(dir);
  const bytes = stats.size;
  const k = 1000;
  const dm = 2;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  if (bytes === 0) {
    return '0 Bytes';
  }

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function getImageFormats() {
  return ['png', 'jpg', 'jpeg', 'gif'];
}

/**
 * Returns the urls of the media inside a given dir
 *
 * @param {string} dir Directory
 * @param {array} _files Files
 * @param {array} elements Elements
 * @returns {array} Media Elements
 */
export function glob(dir, _files, elements) {
  const forbiddenPaths = ['.DS_Store', '.gitkeep', '.git', '.gitignore'];
  const files = fs.readdirSync(dir)
    .filter(f => f && !forbiddenPaths.includes(f))
    .map(f => ({
      name: f,
      time: fs.statSync(`${dir}/${f}`).mtime.getTime()
    }))
    .sort((a, b) => b.time - a.time)
    .map(f => f.name);
  let name;
  let tmp;
  let url;
  let fileInfo;

  _files = _files || [];
  elements = elements || [];

  for (let i = 0; i < files.length; i += 1) {
    if (!forbiddenPaths.includes(files[i])) {
      name = `${dir}/${files[i]}`;

      if (fs.statSync(name).isDirectory()) {
        glob(name, _files, elements);
      } else {
        tmp = name.split('/public/');

        if (isDefined(tmp[1])) {
          url = `${$baseUrl()}/${tmp[1]}`;

          _files.push(name);

          fileInfo = getFileInfo(tmp[1]);

          elements.push({
            name: `${fileInfo.name}.${fileInfo.extension}`,
            extension: fileInfo.extension,
            size: getFileSize(tmp[1]),
            url
          });
        }
      }
    }
  }

  return elements;
}
