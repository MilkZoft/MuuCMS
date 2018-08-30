// Configuration
import { $isLocal } from '@configuration';

// Utils
import { getCurrentApp } from '@utils/url';

// HTML
import html from './html';

// Initial State
import initialState from './initialState';

export default function clientRender() {
  return (req, res, next) => {
    if (req.isBot) {
      return next();
    }

    // Current App
    const currentApp = getCurrentApp(req.url);

    return res.send(html({
      currentApp,
      markup: '',
      initialState: initialState(req, res),
      isNotLocal: !$isLocal()
    }));
  };
}
