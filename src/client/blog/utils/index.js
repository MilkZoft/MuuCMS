// Dependencies
import highlight from 'highlight.js';

// Constants
import { REGEX } from '@constants/regex';

export function isSinglePost(params) {
  const { year, month, day, slug } = params;

  return year && month && day && slug;
}

/**
 * Returns a Highlight Code
 *
 * @param {string} content Content
 * @param {string} codes Codes
 * @returns {string} Highlighted Code.
 */
export function getHighlightCode(content, codes) {
  const matches = codes.match(REGEX.BLOG.POST.CODES);

  if (matches.length === 0) {
    return content;
  }

  let code;
  let language;
  let filename;

  RegExp.escape = s => s.replace(REGEX.ESCAPE, '\\$&');

  for (let i = 0; i < matches.length; i += 1) {
    language = matches[i].substr(0, matches[i].indexOf('\n')).split(':')[0].replace('---', '');
    filename = matches[i].substr(0, matches[i].indexOf('\n')).split(':')[1]; // eslint-disable-line
    code = matches[i].substr(matches[i].indexOf('\n') + 1, matches[i].length).replace('---', '');
    code = highlight.highlight(language, code).value;
    content = content.replace(
      new RegExp(RegExp.escape(`<p>{{${filename.trim()}}}</p>`)),
      `<pre class="hljs"><code class="${language}">${code}</code></pre>`
    );
  }

  return content;
}
