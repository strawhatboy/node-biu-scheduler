'use strict';

import { logger } from '../infra/logger';
let _logger = logger.getLogger('instanceRoute');

module.exports = app => {
    _logger.debug('initializing...');
    let instanceController = app.lib.controllers.instanceController;

    app.get('/startInstance', instanceController.startInstance);
};