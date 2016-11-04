'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.serverApp = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _requestDebugger = require('../midwares/requestDebugger');

var _requestDebugger2 = _interopRequireDefault(_requestDebugger);

var _expressLoad = require('express-load');

var _expressLoad2 = _interopRequireDefault(_expressLoad);

var _logger2 = require('../infra/logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _logger = _logger2.logger.getLogger('serverApp');

var ServerApp = function () {
    function ServerApp() {
        _classCallCheck(this, ServerApp);

        this._app = (0, _express2.default)();
        this._app.use(_bodyParser2.default.urlencoded({
            extended: true
        }));
        this._app.use(_bodyParser2.default.json());
        this._app.use(_requestDebugger2.default);
        (0, _expressLoad2.default)('lib/controllers').then('lib/routes').into(this._app);
    }

    _createClass(ServerApp, [{
        key: 'startServer',
        value: function startServer() {
            _logger.info('starting the express server listening on 8080');
            this._app.listen(8080);
        }
    }]);

    return ServerApp;
}();

var serverApp = exports.serverApp = new ServerApp();
//# sourceMappingURL=serverApp.js.map
