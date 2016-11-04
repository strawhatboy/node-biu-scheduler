'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _logger2 = require('../infra/logger');

var _logger = _logger2.logger.getLogger('RequestDebugger');

exports.default = function (req, res, next) {
    _logger.debug('got request with url: ' + req.originalUrl);
    next();
};
//# sourceMappingURL=requestDebugger.js.map
