'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _logger2 = require('../infra/logger');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _logger = _logger2.logger.getLogger('ActionBase');

var ActionBase = function () {
    function ActionBase(param, callback) {
        _classCallCheck(this, ActionBase);

        this.param = param;
        this.callback = callback;
    }

    _createClass(ActionBase, [{
        key: 'trigger',
        value: function trigger() {
            _logger.error('default trigger() called');
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            _logger.error('default destroy() called');
        }
    }]);

    return ActionBase;
}();

exports.default = ActionBase;
//# sourceMappingURL=action.js.map
