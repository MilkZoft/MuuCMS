// Configuration
import { $isLocal } from '@configuration';

export default () => $isLocal() ? 'cheap-module-source-map' : 'eval';
