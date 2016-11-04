'use strict';

import { logger } from '../infra/logger';
let _logger = logger.getLogger('RequestDebugger');

export default (req, res, next) => {
    _logger.debug(`got request with url: ${req.originalUrl}`);
    next();
}