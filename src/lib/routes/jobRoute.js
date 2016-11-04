'use strict';

import { logger } from '../infra/logger';
let _logger = logger.getLogger('jobRoute');

module.exports = app => {
    _logger.debug('initializing...');
    let jobController = app.lib.controllers.jobController;

    app.post('/createJob', jobController.createJob);
};