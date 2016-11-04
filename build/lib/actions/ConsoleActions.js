'use strict';

// for debugging.

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Components = exports.ConsoleActions = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _action = require('../engine/action');

var _action2 = _interopRequireDefault(_action);

var _logger2 = require('../infra/logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _logger = _logger2.logger.getLogger('AWSActions');

var ConsoleActions = exports.ConsoleActions = function (_ActionBase) {
    _inherits(ConsoleActions, _ActionBase);

    function ConsoleActions(param, callback) {
        _classCallCheck(this, ConsoleActions);

        return _possibleConstructorReturn(this, (ConsoleActions.__proto__ || Object.getPrototypeOf(ConsoleActions)).call(this, param, callback));
    }

    _createClass(ConsoleActions, [{
        key: 'trigger',
        value: function trigger() {
            _logger.info(this.param.format, this.param.params);
            this.callback(this, null, 'done');
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            // nothing to do.
        }
    }]);

    return ConsoleActions;
}(_action2.default);

var Components = exports.Components = [{
    name: "ConsoleActions",
    description: "actions for console output, for debugging use.",
    create: function create(param, callback) {
        return new ConsoleActions(param, callback);
    }
}];
//# sourceMappingURL=ConsoleActions.js.map