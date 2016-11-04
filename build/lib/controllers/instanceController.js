'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _logger2 = require('../infra/logger');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _logger = _logger2.logger.getLogger('instanceController');

var InstanceController = function () {
    function InstanceController() {
        _classCallCheck(this, InstanceController);

        _logger.debug('initializing...');
    }

    // reqPath('/startInstance')


    _createClass(InstanceController, [{
        key: 'startInstance',
        value: function startInstance(req, res) {
            res.send("instanceController - startInstance");
        }
    }]);

    return InstanceController;
}();

// to fit with the express-load


module.exports = new InstanceController();
//# sourceMappingURL=instanceController.js.map
