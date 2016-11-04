'use strict';

var _logger2 = require('../infra/logger');

var _logger = _logger2.logger.getLogger('instanceRoute');

module.exports = function (app) {
    _logger.debug('initializing...');
    var instanceController = app.lib.controllers.instanceController;

    app.get('/startInstance', instanceController.startInstance);
};
//# sourceMappingURL=instanceRoute.js.map
