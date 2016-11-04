'use strict';

var _logger2 = require('../infra/logger');

var _logger = _logger2.logger.getLogger('jobRoute');

module.exports = function (app) {
    _logger.debug('initializing...');
    var jobController = app.lib.controllers.jobController;

    app.post('/createJob', jobController.createJob);
};
//# sourceMappingURL=jobRoute.js.map
