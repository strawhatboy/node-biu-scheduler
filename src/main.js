'use strict';

import { logger } from './lib/infra/logger';
import { serverApp } from './lib/server/serverApp';

let _logger = logger.getLogger('main');

serverApp.startServer();

