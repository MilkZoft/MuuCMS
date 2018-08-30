// Utils
import { getNewState } from '../utils/frontend';
import { content } from '../utils/object';

export default function contentReducer(state = {}) {
  if (state.__) {
    return getNewState(state, {
      content: key => content(key, JSON.parse(state.__))
    });
  }

  return getNewState(state, {
    content: key => content(key, {})
  });
}
