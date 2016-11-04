'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.awsService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _logger2 = require('../infra/logger');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _logger = _logger2.logger.getLogger('AWService');

var AWService = function () {
    function AWService() {
        _classCallCheck(this, AWService);
    }

    _createClass(AWService, [{
        key: 'startInstance',
        value: function startInstance(instanceId) {
            _logger.info('starting the instance with id: ' + instanceId);
        }
    }]);

    return AWService;
}();

var awsService = exports.awsService = new AWService();
//# sourceMappingURL=AWService.js.map
